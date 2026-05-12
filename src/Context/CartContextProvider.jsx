import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import { AuthContext } from './AuthContextProvider'
export let CartContext = createContext()
export default function CartContextProvider({ children }) {
    let [numsCartItem, setNumsCartItem] = useState(0)
    let { token } = useContext(AuthContext)
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart'

    function getHeaderOptions() {
        return {
            headers: {
                token: token || localStorage.getItem("token"),
            }
        };
    }

    useEffect(() => {
        if (token || localStorage.getItem("token")) {
            getUserCart().then((req) => {
                setNumsCartItem(req.data.numOfCartItems);
            }).catch(() => {
                setNumsCartItem(0)
            })
        } else {
            setNumsCartItem(0)
        }
    }, [token])

    function getUserCart() {
        return axios.get(baseUrl, getHeaderOptions());
    }
    function addUserCart(id) {
        let data = {
            productId: id
        }
        return axios.post(baseUrl, data, getHeaderOptions())
    }
    function deleteUserCart(id) {
        return axios.delete(`${baseUrl}/${id}`, getHeaderOptions())
    }
    function clearUserCart() {
        return axios.delete(baseUrl, getHeaderOptions())
    }
    function updateCart(id, count) {
        let data = {
            count: count
        }
        return axios.put(`${baseUrl}/${id}`, data, getHeaderOptions())
    }
    return (
        <CartContext.Provider value={{ getUserCart, numsCartItem, setNumsCartItem, addUserCart, deleteUserCart, clearUserCart, updateCart }}>{children}</CartContext.Provider>
    )
}
