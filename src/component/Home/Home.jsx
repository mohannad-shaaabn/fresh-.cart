import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Product from './../Product/Product';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {


  const [page, setPage] = useState(1);
  let { addUserCart, setNumsCartItem } = useContext(CartContext)
  function GetAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=25&page=${page}`)
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", page],
    queryFn: GetAllProducts
  })
  let nums = [];
  for (let i = 1; i <= data?.data?.metadata?.numberOfPages; i++) {
    nums.push(i);
  }



  function getPageNumber(e) {
    let page = e.target.getAttribute("page");
    setPage(page);
  }
  if (isError) {
    return <h2 className='text-red-600'>{error.response.data.message}</h2>
  }
  function addCart(id) {
    addUserCart(id)
      .then((req) => {
        console.log(req);
        setNumsCartItem(req.data.numOfCartItems)
        toast.success(req.data.message)

      })
      .catch((err) => { toast.error(error.response.data.message) })
  }
  return (
    <>
      <Toaster />
      {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'><span class="loader"></span></div> : <div className='w-10/12 mx-auto my-6'>
        <MainSlider />
        <CategorySlider />
        <div className='flex flex-wrap'>
          {data?.data?.data?.map((product) => {
            let { _id, price, imageCover, category, title, ratingsAverage } = product
            let { name } = category
            return <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3'>
              <div className='item group overflow-hidden hover:border  hover:border-active p-4'>
                <Link to={`/ProductDetails/${_id}`}>
                  <img src={imageCover} alt="" className='w-full' />
                  <h5 className='text-active'>{name}</h5>
                  <h2 className=''>{title.split(" ").slice(0, 2).join(" ")}</h2>
                  <div className='flex justify-between'>
                    <span>{price}EGP</span>
                    <span><i className="fa-solid fa-star text-yellow-300 me-1" />{ratingsAverage}</span>
                  </div>
                </Link>
                <button onClick={() => addCart(_id)} className='btn duration-500 translate-y-24 group-hover:translate-y-0'>Add to Cart</button>
              </div>
            </div>
          })}

        </div>


        <nav aria-label="Page navigation example" >
          <ul className="flex items-center justify-center -space-x-px h-8 text-sm ">
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                </svg>
              </a>
            </li>
            {new Array(data?.data?.metadata?.numberOfPages)
              .fill("")
              .map((el, i) => {
                return (
                  <li onClick={getPageNumber} key={el}>
                    <a page={i + 1} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i + 1}</a>


                  </li>
                )
              })

            }


            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
              </a>
            </li>


          </ul>
        </nav>



      </div >}




    </>
  )
}
