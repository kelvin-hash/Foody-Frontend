import React from "react";
import hero from "../assets/hero.png";
import { MapPin,Search } from "lucide-react";

function Hero(){
    return(
        <section className="relative items-center justify-center overflow-hidden w-full h-[600px]">
            <img src={hero} alt="hero" className="absolute inset-0 w-full h-full object-cover z-0 "/>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-1 z-10"></div>
            {/* Content */}
            <div className="relative z-20 text-center text-black">
                <div className="flex items-center bg-white p-1 rounded-full shadow-lg max-w-2xl mx-auto">
                    <div className="ml-4 text-orange-500">
                        <MapPin size={20}/>
                    </div>
                    <input className="flex-1 px-4 py-3 outline-none bg-transparent" type="text" placeholder="Enter Your Delivery Address Here"></input>
                    <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold">
                        <Search size={20} color="white"/>
                    </button>
                </div>
            </div>
            
        </section>
    );
}
export default Hero;