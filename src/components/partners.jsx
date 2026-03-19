import React from "react";
import {Bike,Store} from "lucide-react";

function Partners(){
    return(
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-300">Partner With Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform border border-gray-100">
                        <div className="bg-green-100 rounded-full flex items-center justify-center mb-6 w-16 h-16">
                            <Bike size={24} color="#34D399"/>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mb-3">Become a Rider and deliver for us</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">Join our growing delivery network and earn on your own terms. As a rider partner, you’ll deliver food from top restaurants to customers nearby, enjoy flexible working hours,
                         and get paid per delivery. Whether you ride full-time or part-time, we give you the tools and support to help you succeed on the road</p>
                        <button className="border-2 border-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all flex items-center gap-2">Register</button>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform border border-gray-100">
                        <div className="bg-green-100 rounded-full flex items-center justify-center mb-6 w-16 h-16">
                            <Store size={24} color="#34D399"/>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 mb-3">Register Your Restaurant</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">Reach more customers, increase orders, and grow your business with our food delivery platform. We connect your restaurant
                         to hungry customers nearby, handle delivery logistics, and help you boost visibility — so you can focus on making great food.</p>
                        <button className="border-2 border-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all flex items-center gap-2">Register</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Partners;