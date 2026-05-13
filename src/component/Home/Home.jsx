import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [data]);

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
        setNumsCartItem(req.data.numOfCartItems)
        toast.success(req.data.message)

      })
      .catch((err) => { toast.error(err.response?.data?.message || 'Something went wrong') })
  }
  return (
    <>
      <Toaster />
      {isLoading ? <div className='bg-slate-300 flex justify-center items-center h-screen'><span className="loader"></span></div> : <div className='animate-fade-in w-11/12 lg:w-10/12 mx-auto my-6 space-y-6'>
        <div className='scroll-reveal reveal-up'>
          <MainSlider />
        </div>
        <div className='scroll-reveal reveal-right' style={{ transitionDelay: '120ms' }}>
          <CategorySlider />
        </div>
        <div className='flex flex-wrap -mx-2'>
          {data?.data?.data?.map((product) => {
            let { _id, price, imageCover, category, title, ratingsAverage } = product
            let { name } = category
            return <div key={_id} className='2xl:w-1/6 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full px-2 mb-4'>
              <div
                className='item group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-active hover-float scroll-reveal reveal-zoom'
                style={{ transitionDelay: `${(parseInt(_id.slice(-2), 16) % 8) * 70}ms` }}
              >
                <Link to={`/ProductDetails/${_id}`}>
                  <img src={imageCover} alt={title} className='w-full aspect-[4/5] rounded-xl object-cover object-center' />
                  <h5 className='mt-3 text-sm text-active'>{name}</h5>
                  <h2 className='min-h-12 font-medium text-slate-800'>{title.split(" ").slice(0, 3).join(" ")}</h2>
                  <div className='mt-2 flex justify-between text-sm'>
                    <span className='font-medium'>{price} EGP</span>
                    <span><i className="fa-solid fa-star text-yellow-300 me-1" />{ratingsAverage}</span>
                  </div>
                </Link>
                <button onClick={() => addCart(_id)} className='btn mt-3 duration-500 hover-pulse sm:translate-y-24 sm:group-hover:translate-y-0'>Add to Cart</button>
              </div>
            </div>
          })}

        </div>


        <nav aria-label="Page navigation example" className='overflow-x-auto pb-2 scroll-reveal reveal-left' style={{ transitionDelay: '90ms' }}>
          <ul className="flex items-center justify-center min-w-max h-8 text-sm ">
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
                  <li onClick={getPageNumber} key={i}>
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
