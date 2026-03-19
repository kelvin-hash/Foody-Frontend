import React from "react";
import {Star,MapPin} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from '../context/restaurantContext';

 function Restaurant(){
    const { restaurants } = useRestaurants();

    const navigate = useNavigate();
        return(
            <section className="py-16 px-6 bg-white items-center justify-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl text-center font-bold text-orange-500 mb-8">Top Restaurants Near You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {restaurants.map((restaurant) =>(
                            <div onClick={()=> navigate(`/restaurant/${restaurant._id}`)} key={restaurant._id} className="bg-white rounded-xl p-6 shadow-lg hover:scale-105 shadow-orange-500 transition-shadow cursor-pointer">
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
                        ))}
                    </div>
                </div>
            </section>
        );
 }
 export default Restaurant;