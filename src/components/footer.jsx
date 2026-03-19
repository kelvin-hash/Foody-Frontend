import React from "react";
import {Instagram,X,Facebook,logo} from "../assets/index.js";

function Footer(){
    return(
        <footer className="bg-gray-900 py-12 text-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <img src={logo} alt="logo" className="w-8 h-8"/>
                    <p className="text-xl font-bold">FOODY</p>
                </div>
                <div className="flex justify-center gap-6 mb-6 flex-wrap">
                    <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
                    <a href="#" className="hover:text-orange-500 transition-colors">About Us</a>
                    <a href="#" className="hover:text-orange-500 transition-colors">Contact</a>
                </div>
                <div className="flex justify-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-poin">
                        <img src={Instagram} alt="Instagram" className="w-5 h-5"/>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-poin">
                        <img src={Facebook} alt="Facebook" className="w-5 h-5"/>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-poin">
                        <img src={X} alt="X" className="w-5 h-5"/>
                    </div>
                    <p className="text-gray-500 text-sm border-t border-gray-700 pt-8">© 2026 FOODY. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;