import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
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
                setNumsCartItem(req.data.numOfCartItems)
                toast.success(req.data.message)

            })
            .catch((err) => { toast.error(err.response.data.message) })
    }
    return <>
        <Toaster />
        {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'><span className="loader"></span></div> : <div className='flex justify-center items-center min-h-screen my-8'>
            <div className='flex flex-col lg:flex-row w-11/12 lg:w-10/12 justify-center items-start gap-6'>
                <div className='w-full lg:w-4/12'>
                    <img className='w-full aspect-square rounded-2xl object-cover object-center' src={product?.imageCover} id='myImage' alt={product?.title} />
                    <div className='flex mt-2 gap-2 overflow-x-auto'>
                        {product?.images.map((image, i) => {
                            return (
                                <div key={i} className='shrink-0 w-20 sm:w-24 cursor-pointer'>
                                    <img src={image} onClick={changeImage} alt={product?.title} className='w-full aspect-square rounded-lg object-cover object-center' />
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className='w-full lg:w-8/12'>
                    <h2 className='text-2xl font-semibold text-slate-800'>{product?.title}</h2>
                    <p className='text-slate-500 mt-3 text-sm sm:text-base' >{product?.description}</p>
                    <span className='block text-[16px] text-active mt-3'>{product?.category.name}</span>
                    <span className='mt-2 block text-lg font-semibold'>{product?.price} EGP</span>
                    <button onClick={() => addCart(id)} className='btn max-w-xs'><i className="fa-solid fa-plus text-white me-2"></i>add to cart</button>
                </div>
            </div>
        </div>}

    </>
}
