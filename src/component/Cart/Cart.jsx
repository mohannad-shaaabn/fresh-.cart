import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider'
import Product from './../Product/Product';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getUserCart, deleteUserCart, setNumsCartItem, clearUserCart, updateCart } = useContext(CartContext)
  let [cartData, setCartData] = useState(null);
  let [loading, setloading] = useState(true);
  useEffect(() => {
    getCartData()
  }, [])
  function getCartData() {
    setloading(true)
    getUserCart()
      .then((req) => {
        setCartData(req.data.data)
        console.log(req.data.data);
        setloading(false)
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
  }
  function removeItem(id) {
    deleteUserCart(id).then((req) => {
      console.log(req);
      setNumsCartItem(req.data.numOfCartItems)
      setCartData(req.data.data)
      toast.success("product deleted")
    })
      .catch((err) => { })
  }
  function clearItems() {
    clearUserCart().then((req) => {
      if (req.data.message == "success") {
        setCartData(null)
        setNumsCartItem(null)
        toast.success("Cart Cleard")
      }
    }).catch((err) => { })
  }
  function updateCount(id, count) {
    updateCart(id, count).then((req) => {
      console.log(req);
      setCartData(req.data.data)
    })
  }
  if (loading) {
    return <div className='bg-slate-300 flex justify-center items-center h-screen'><span class="loader"></span></div>
  }

  return (
    <>
      <Toaster />
      {cartData?.products?.length > 0 ? <div className=' w-10/12 mx-auto my-5'>
        <div className='bg-gray-200 p-4'>
          <h1 className='text-2xl'>Shop Cart :</h1>
          <h2 className='text-2xl active ms-3'>Totale cart price :{cartData.totalCartPrice}</h2>

          <div className='divide-y divide-solid divide-gray-300'>
            {cartData?.products?.map((item) => {
              return <div key={item._id} className='flex items-center py-3'>
                <div className='w-10/12'>
                  <div className='flex justify-around'>
                    <div className='w-1/12'>
                      <img src={item.product.imageCover} className='w-full' alt="" /></div>
                    <div className='w-10/12'>
                      <h2>{item.product.title} </h2>
                      <h2>{item.price} </h2>
                      <button onClick={() => removeItem(item.product._id)} className='border border-red-500 px-2 py-1 my-2 rounded text-red-500 hover:bg-red-500 hover:text-white'><i class="fa-solid fa-trash-can"></i> remove</button>

                    </div>
                  </div>
                </div>
                <div className='w-2/12'>
                  <i onClick={() => updateCount(item.product._id, item.count + 1)} className="fa-solid border border-active p-2 rounded fa-plus cursor-pointer"></i>
                  <span className='mx-2'>{item.count}</span>
                  <i onClick={() => { updateCount(item.product._id, item.count - 1) }} class="fa-solid border border-active p-2 rounded fa-minus cursor-pointer"></i>
                </div>
              </div>
            })}

          </div>
        </div>
        <button onClick={clearItems} className='w-full bg-red-500 p-2 rounded mt-2 hover:bg-red-600 text-white duration-[0.3s]' >clear cart <i class="fa-solid fa-trash-arrow-up"></i></button>
        <Link to={'/ShipngDetals/'+cartData._id} className='btn block text-center'>pay <i class="fa-brands fa-cc-visa"></i></Link>
      </div> : <div className='bg-red-400 text-center'>no data</div>}

    </>
  )
}
