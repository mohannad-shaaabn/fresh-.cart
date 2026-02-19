import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export let CartContext = createContext()
export default function CartContextProvider({ children }) {
    let [numsCartItem, setNumsCartItem] = useState(null)
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart'
    const headerOptions = {
        headers: {
            token: localStorage.getItem("token"),
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserCart().then((req) => {
                console.log(req.data.numOfCartItems);
                setNumsCartItem(req.data.numOfCartItems);
            })
        }
    })
    function getUserCart() {
        return axios.get(baseUrl, headerOptions);
    }
    function addUserCart(id) {
        let data = {
            productId: id
        }
        return axios.post(baseUrl, data, headerOptions)
    }
    function deleteUserCart(id) {
        return axios.delete(`${baseUrl}/${id}`, headerOptions)
    }
    function clearUserCart() {
        return axios.delete(baseUrl, headerOptions)
    }
    function updateCart(id, count) {
        let data = {
            count: count
        }
        return axios.put(`${baseUrl}/${id}`, data, headerOptions)
    }
    return (
        <CartContext.Provider value={{ getUserCart, numsCartItem, setNumsCartItem, addUserCart, deleteUserCart, clearUserCart, updateCart }}>{children}</CartContext.Provider>
    )
}
