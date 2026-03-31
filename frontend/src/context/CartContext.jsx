import { createContext, useContext, useEffect, useState } from "react";
import { authFetch,getAccessToken } from "../utils/Auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BACKEND_URL = import.meta.env.VITE_DJANGO_BASE_URL 
    const [cartItems, setCartItems] = useState([]);
    const [total,setTotal] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await authFetch(`${BACKEND_URL}/api/cart/`)
                const data = await res.json();
                setCartItems(data.items || []);
                setTotal(data.total || 0);
            
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(()=>{
        fetchCart();
    },[])

    // add product to cart
    const addToCart=async (product) => {
        try {
            await authFetch(`${BACKEND_URL}/api/cart/add/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({product_id:product.id})
            })
                fetchCart(); // Refresh cart after adding item
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    // remove product from cart
   const removeFromCart = async (itemId) => {
    try {
        await authFetch(`${BACKEND_URL}/api/cart/remove/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ item_id: itemId })
        })
        fetchCart(); // Refresh cart after removing item
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
   }

    // update product quantity in cart
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }
        try {
            await authFetch(`${BACKEND_URL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ item_id: itemId, quantity })
            })
            fetchCart(); // Refresh cart after updating quantity
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    }


    const clearCart =() => {
        setCartItems([]);
        setTotal(0);
    }


     return (
        <CartContext.Provider value={{cartItems,total,addToCart,removeFromCart,updateQuantity,clearCart}}>
            {children}
        </CartContext.Provider>
    )
    
    }

    export const useCart = () => useContext(CartContext);
   