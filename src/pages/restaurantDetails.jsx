import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useParams } from 'react-router-dom';
import { ArrowBigLeft,Search } from "lucide-react";
import { useRestaurants } from '../context/restaurantContext.jsx';
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cartContext.jsx';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import {useState} from 'react';


function RestaurantDetails() {
    const{restaurants,menu,loading,fetchMenu}= useRestaurants();
    const { addToCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(null);
    useEffect(()=>{
        fetchMenu(id);
    }, [id]);
    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }
    const restaurant = restaurants.find((rest) => rest._id === id);
    if (!restaurant) {
        return <div className="p-10 text-center">Restaurant not found</div>;
    }
    const menus = menu[id] || [];
    const filterdMenus = searchTerm ? menus.filter(menu => menu.name.toLowerCase().includes(searchTerm.toLowerCase()) || menu.description.toLowerCase().includes(searchTerm.toLowerCase())) : menus;

    // function to handle adding items to the cart.Takes in an item object and adds it to the cart context with the restaurant id and name for reference.
    const handleAddToCart = (item) => {
        const itemWithRestaurant = { ...item,
             restaurantId: restaurant._id,
             restaurantName: restaurant.name };
        // call the addToCart function from the cart context to add the item to the cart
        addToCart(itemWithRestaurant);
        // show an alert to the user that the item has been added to the cart
        toast.success(`${item.name} added to cart!`);
    }

    return (
        <div>
            <Navbar />
            <section className='py-12 px-8 bg-white'>
                <div className='max-w-7xl mx-auto px-6'>
                    <button onClick={()=>navigate(-1)} className='flex items-center gap-1 text-black-500 mb-4 hover:text-orange-500 border border-black-500 rounded-lg'>
                        <ArrowBigLeft className='w-4 h-4 ' />
                        BACK
                    </button>
                    <div className="max-w-6xl mx-auto px-6 py-10">
                        {/* Image */}
                        <div className="w-full mb-8">
                            <img
                                src={restaurant.icon}
                                alt={restaurant.name}
                                className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
                            />
                        </div>

                        {/* Info Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                {restaurant.name}
                            </h2>

                            <div className="flex flex-wrap gap-6 text-gray-600">
                                <p className="text-lg">
                                    <span className="font-semibold text-gray-800">Cuisine:</span>{" "}
                                    {restaurant.cuisine}
                                </p>

                                <p className="text-lg">
                                    <span className="font-semibold text-gray-800">Rating:</span>{" "}
                                    {restaurant.ratings} ⭐
                                </p>

                                <p className="text-lg">
                                    <span className="font-semibold text-gray-800">Distance:</span>{" "}
                                    {restaurant.area}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className='py-12 bg-white'>
                <div className='max-w-7xl mx-auto px-6'>
                    <h2 className='text-3xl font-bold mb-8'>MENU</h2>
                    {/* Search Bar */}
                    <div className='background-white rounded-full flex items-center shadow-lg gap-4 p-2 max-w-6xl mb-4'>
                        <div pl-4>
                            <Search size={20} color='#f97316' className='ml-2 flex-1'/>
                        </div>
                        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search menu..." className='flex-2 px-4 py-3 outline-none bg-transparent'/>
                        <button className="bg-orange-500 text-white text-lg rounded-full mr-2 w-20 h-10">search</button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filterdMenus.map(item=>(
                            <div key={item._id} className='bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-300'>
                                <div className='w-full h-48 md:h-56 overflow-hidden'>
                                    <img src={item.image} alt={item.name} className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'/>
                                </div>
                                <div className='p-4 flex flex-col gap-2'>
                                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-orange-500 text-lg">KSH{item.price}</span>
                                    <span className="text-sm text-gray-500">{item.category}</span>
                                </div>
                                <button onClick={()=> handleAddToCart(item)} className='bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600'>
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
export default RestaurantDetails;