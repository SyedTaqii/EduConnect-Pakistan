// src/context/WishlistContext.jsx
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) setWishlist(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (tutor) => {
        if (!wishlist.find((t) => t._id === tutor._id)) {
            setWishlist((prev) => [...prev, tutor]);
        }
    };

    const removeFromWishlist = (tutorId) => {
        setWishlist((prev) => prev.filter((t) => t._id !== tutorId));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
