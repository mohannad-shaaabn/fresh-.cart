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

    {isLoading ? (
      <div className='bg-slate-300 flex justify-center items-center min-h-screen'>
        <span className="loader"></span>
      </div>
    ) : (
      <div className='min-h-screen flex justify-center items-center py-10 px-4'>
        <div className='flex flex-col md:flex-row w-full md:w-10/12 gap-8 bg-white p-6 rounded-lg shadow-sm'>

          {/* الصور */}
          <div className='w-full md:w-5/12'>
            <img
              className='w-full rounded-lg'
              src={product?.imageCover}
              id='myImage'
              alt=""
            />

            <div className='flex gap-3 mt-4 overflow-x-auto'>
              {product?.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  onClick={changeImage}
                  className='w-20 h-20 object-cover cursor-pointer border rounded-md hover:border-green-500'
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* التفاصيل */}
          <div className='w-full md:w-7/12 flex flex-col justify-center'>

            <h2 className='text-2xl font-semibold'>
              {product?.title}
            </h2>

            <p className='text-slate-500 mt-4 text-sm leading-relaxed'>
              {product?.description}
            </p>

            <span className='mt-4 text-active font-medium'>
              {product?.category.name}
            </span>

            <span className='mt-2 text-xl font-bold'>
              {product?.price} EGP
            </span>

            <button
              onClick={() => addCart(id)}
              className='btn mt-6 w-full md:w-fit px-6 py-3'
            >
              <i className="fa-solid fa-plus text-white me-2"></i>
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    )}
  </>
}
