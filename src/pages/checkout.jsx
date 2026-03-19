import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Plus,Minus,CreditCard,Wallet,Smartphone,Trash2,ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/cartContext.jsx';
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import AuthModal  from '../components/AuthModal.jsx';
function Checkout(){
    const navigate = useNavigate();
    const {removeFromCart,updateQuantity,clearCart,getCartTotal,cartItems}=useCart();
    const { user, token } = useAuth();
    const subtotal = getCartTotal();
    const deliveryFee = 50;
    const tax = subtotal * 0.16;
    const [phoneNumber,setPhoneNumber] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [address,setAddress] = useState("");
    const [loading,setLoading] = useState(false);
    const API_URL = "https://foody-1jab.onrender.com/api/orders";
    const verifyLogin = () => {
            if (!user) {
                toast.error("You must be logged in to place an order");
                setShowAuthModal(true);
                return false;
            }
            return true;
        }
    const handlePayment = async (e) =>{
            e.preventDefault();
            try {
                if(!verifyLogin()){
                    return;
                }
                // validate the phone number
                if(!phoneNumber.startsWith("254") || phoneNumber.length !==12){
                    return toast.error("Enter a valid phone number (254XXXXXXXX)");
                }
                // make a post request to the backend to process the payment
                // set loading to true so as to track the payment process and disable the button
                setLoading(true);
                const response = await axios.post(`${API_URL}/checkout`,{
                    restaurantId:cartItems[0].restaurantId,
                    items:cartItems,
                    location:address,
                    paymentMethod:"mpesa",
                    phoneNumber
                },{headers: {"Authorization": `Bearer ${token}`}});
                if(response.data.message === "Order created successfully") {
                    toast.success("Payment initiated successfully. Please complete the payment on your phone.");
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error.message);
                toast.error("Payment failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    return( 
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <button onClick={()=>navigate(-1)} className='flex items-center gap-2 text-gray-600 hover:text-orange-500'>
                        <ArrowLeft className='w-4 h-4' />
                        Back to restaurant
                    </button>
                </div>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
                                <div className='space-y-4'>
                                    {cartItems.map(item=>(
                                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                                            <div className='text-5xl'>
                                                <img src={item.image} alt={item.name} className='h-20'></img>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                                                {/*<p className="text-sm text-gray-500">from {item.restaurant}</p>*/}
                                                <p className="text-orange-500 font-semibold mt-1">KSH{item.price.toFixed(2)}</p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                                                    <Minus onClick={()=>updateQuantity(item.id,item.quantity-1)} className='w-4 h-4 text-gray-600' />
                                                </button>
                                                {/* Quantity */}
                                                <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                                <button onClick={()=>updateQuantity(item.id,item.quantity+1)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                                                    <Plus className='w-4 h-4 text-gray-600' />
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <p className="font-bold text-lg">KSH{(item.price *item.quantity).toFixed(2)}</p>
                                                <button onClick={()=>removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className='w-5 h-5' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
                                    <div className="space-y-3">
                                        <button type="button" className="w-full flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                                            <div className="flex-1 text-left">
                                                <Wallet className='w-5 h-5 text-gray-600' />
                                                <p className="font-semibold text-gray-800">Cash on Delivery</p>
                                                <p className="text-sm text-gray-500">Pay when you receive</p>
                                            </div>
                                        </button>
                                        <button type="button" className="w-full flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                                            <div className="flex-1 text-left">
                                                <CreditCard className='w-5 h-5 text-gray-600' />
                                                <p className="font-semibold text-gray-800">Credit/Debit Card</p>
                                                <p className="text-sm text-gray-500">MasterCard,Visa...</p>
                                            </div>
                                        </button>
                                         <button type="button" className="w-full flex items-center gap-4 p-4 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-colors">
                                            <div className="flex-1 text-left">
                                                <Smartphone className='w-5 h-5 text-gray-600' />
                                                <p className="font-semibold text-gray-800">Mobile Money</p>
                                                <p className="text-sm text-gray-500">Mpesa</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {/* delivery Details*/}
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Details</h2>
                                    <form className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Phone Number</label>
                                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Enter your payment phone number i.e (2547XXXXXXXX)" />
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Phone Number</label>
                                        <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Enter your delivery phone number i.e (2547XXXXXXXX)" />
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Enter your full delivery address" />
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                                        <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none" rows="3" placeholder="Any special delivery instructions?"></textarea>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Sub Total</span>
                                        <span className="font-semibold text-gray-800">KSH{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Delivery Fee</span>
                                        <span className="font-semibold text-gray-800">{deliveryFee}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-semibold text-gray-800">{tax}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-300 my-4"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-800">Total</span>
                                    <span className="text-2xl font-bold text-orange-500">KSH{subtotal+deliveryFee+tax}</span>
                                </div>
                                <div className="border-t border-gray-300 my-6"></div>
                                <button onClick={handlePayment} className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors">
                                    {loading ? "Processing..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AuthModal
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)}
            />
            <Footer />
        </div>
    );
}
export default Checkout;