import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {Search} from 'lucide-react';
import { foodFilters } from '../data/foods';
import {Star,MapPin} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from '../context/restaurantContext';
import { useState } from 'react';

function Restaurant(){
    const navigate = useNavigate();
    const { restaurants } = useRestaurants();
    const [searchTerm, setSearchTerm] = useState(null);
    const filteredRestaurants = searchTerm ? restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) : restaurants;
    return(
        <>
        <Navbar />
        <section className='bg-white py-12 px-6'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-3xl font-bold text-black text-center mb-6'>Find Your Favourite Restaurants</h1>
                <div className='bg-white rounded-full shadow-lg flex items-center gap-2 p-3 '>
                    <div className='pl-4'>
                        <Search size={20} color="#34D399"/>
                    </div>
                    <input onChange={(e) => setSearchTerm(e.target.value)} type='text' className='flex-1 px-4 py-3 outline-none bg-transparent' placeholder='Search For Your Favourite Restaurants and Cuisine'></input>
                    <button className='bg-green-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600'>Search</button>
                </div>
            </div>
        </section>
        <section className='bg-white py-6 shadow-sm '>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='flex gap-3 overflow-x-auto pb-2'>
                    <button onClick={()=>setSearchTerm(null)} className='flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-green-400 cursor-pointer transition-all whitespace-nowrap font-medium'>
                        <span className='text-2xl'>🍽️</span>
                        <span className='font-semibold'>All</span>
                    </button>
                    {foodFilters.map(food=>(
                        <button key={food.id} onClick={() => setSearchTerm(food.label)} className='flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-green-400 cursor-pointer transition-all whitespace-nowrap font-medium'>
                            <span className='text-2xl'>{food.emoji}</span>
                            <span className='font-semibold'>{food.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
        {/* main content wrapper */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                {/* left side bar */}
                <aside className='lg:col-span-1 sticky top-30 h-fit '>
                    <div className='bg-white rounded-xl shadow-md p-6 space-y-2'>
                        <h3 className='text-xl font-bold mb-4 text-gray-800'>Categories</h3>
                        {foodFilters.map(food=>(
                            <ul>
                                <li key={food.id} onClick={() => setSearchTerm(food.label)} className='py-2.5 px-4 rounded-lg cursor-pointer hover:bg-green-50 transition-colors text-gray-700 font-medium'>
                                    <span>{food.label}</span>
                                </li>
                            </ul>
                        ))}
                    </div>
                </aside>
            <div className='lg:col-span-3'>
                <h2 className='text-2xl font-bold mb-6'>All Restaurants</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {
                        filteredRestaurants.length>0?(
                            filteredRestaurants.map((restaurant) =>(
                                <div onClick={()=> navigate(`/restaurant/${restaurant._id}`)} key={restaurant._id} className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 shadow-green-500 transition-shadow cursor-pointer">
                                    <img src={restaurant.icon} alt={restaurant.name} className="mx-auto object-contain h-25 w-25"/>
                                    <h3 className="text-xl font-semibold mt-4 text-center text-gray-600">{restaurant.name}</h3>
                                    <p className="text-gray-300 text-sm text-center mt-1">Cuisine:{restaurant.cuisine}</p>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold text-gray-700">{restaurant.ratings}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">Distance:{restaurant.area}</span>
                                    </div>
                                </div>
                            </div>
                        ))):(
                            <span className='text-gray-500 text-center col-span-3'>No restaurants found matching your search.</span>
                        )}    
                </div>
            </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
export default Restaurant;