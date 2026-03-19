import React, { createContext, useState, useContext } from 'react';

{/*create the context */ }
const CartContext = createContext();
// create a provider component
export function Cartprovider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
    // Check if the item is already in the cart
        const exists = cartItems.find(itemInCart => itemInCart.id === item.id);
        
        // if it exists we update the quantity by 1
        if(exists){
            setCartItems(prev => prev.map(
                itemInCart => itemInCart.id === item.id 
                    ? {...itemInCart, quantity: itemInCart.quantity + 1}
                    : itemInCart
            ))
        }
        // if it does not exist we add the item to the cart with a quantity of 1
        else{
            setCartItems(prev => [...prev, {...item, quantity: 1}]);
        }
};
    // function to remove items from the cart
    // takes in an item id
    const removeFromCart = (itemId) => {
       setCartItems(prev =>prev.filter(item => item.id !== itemId)); 
    }
    // function to update the quantity of an item in the cart    // takes in an item id and the new quantity
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            // If quantity is 0, remove item
            removeFromCart(itemId);
        } else {
            // Otherwise update the quantity
            setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
        }
   };
 //function to clear the cart
   const clearCart = () => {
    setCartItems([]);
   };
//function to get the total price of the items in the cart
   const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };


    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
} 
// custom hook to use the cart context
export function useCart() {
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}