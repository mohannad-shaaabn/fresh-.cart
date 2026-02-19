import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    let { id } = useParams();
    let { addUserCart, setNumsCartItem } = useContext(CartContext)
    let { isLoading, data } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: function () {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        }

    })
    function changeImage(e) {
        let Imagesrc = e.target.getAttribute("src");
        document.getElementById('myImage').setAttribute("src", Imagesrc)

    }
    let product = data?.data?.data;
    function addCart(id) {
        addUserCart(id)
            .then((req) => {
                console.log(req);
                setNumsCartItem(req.data.numOfCartItems)
                toast.success(req.data.message)

            })
            .catch((err) => { toast.error(err.response.data.message) })
    }
    return <>
        <Toaster />
        {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'><span class="loader"></span></div> : <div className='flex justify-center items-center h-screen my-8'>
            <div className='flex w-10/12  justify-center items-center'>
                <div className='w-4/12'>
                    <img className='pe-4 ' src={product?.imageCover} id='myImage' alt="" />
                    <div className='flex mt-2'>
                        {product?.images.map((image, i) => {
                            return (
                                <div key={i}>
                                    <img src={image} onClick={changeImage} alt="" />
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className='w-8/12'>
                    <h2>{product?.title}</h2>
                    <p className='text-slate-500 mt-3 text-[14px]' >{product?.description}</p>
                    <span className='block text-[16px] text-active mt-3'>{product?.category.name}</span>
                    <span className='block text-[16px]'>{product?.price}EGP</span>
                    <button onClick={()=>addCart(id)} className='btn'><i className="fa-solid fa-plus text-white me-2"></i>add to cart</button>
                </div>
            </div>
        </div>}

    </>
}
