import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState({}); // { restaurantId: [menuItems] }
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://foody-1jab.onrender.com/api/restaurants");
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenu = async (restaurantId) => {
    if (menu[restaurantId]) return; // already fetched
    try {
      const res = await axios.get(`https://foody-1jab.onrender.com/api/restaurants/${restaurantId}/menu`);
      setMenu(prev => ({ ...prev, [restaurantId]: res.data }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants, menu, fetchMenu, loading,fetchRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  return useContext(RestaurantContext);
};