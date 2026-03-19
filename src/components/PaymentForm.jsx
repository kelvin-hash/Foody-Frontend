import React from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext";
import {toast} from "react-toastify";

const paymentForm = () =>{
    const { cartItems} = useCart();
    const { user } = useAuth();
    const {phoneNumber,setPhoneNumber} = useState("");
    const {address,setAddress} = useState("");
    const {loading,setLoading} = useState(false);
    const API_URL = "http://localhost:5000/api/payments";

    const handlePayment = async (e) =>{
        e.preventDefault();
        try {
            // validate the phone number
            if(!phoneNumber.startswith("254") || phoneNumber.length !==12){
                return toast.error("Enter a valid phone number (2547XXXXXXXX)");
            }
            // make a post request to the backend to process the payment
            // set loading to true so as to track the payment process and disable the button
            setLoading(true);
            const response = await axios.post(`${API_URL}/checkout`,{
                userId:user,
                restaurantId:cartItems[0].restaurantId,
                items:cartItems,
                location:address,
                paymentMethod:"mpesa",
                phoneNumber
            });
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
        <div>
            <form onSubmit={handlePayment}>
                <input
                    type="text"
                    placeholder="2547XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border p-2 w-full"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 mt-2"
                >
                    {loading ? "Processing..." : "Pay with M-Pesa"}
                </button>
            </form>
        </div>
    )
};

export default paymentForm;