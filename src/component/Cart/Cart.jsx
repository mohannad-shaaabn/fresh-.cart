import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContextProvider'
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
        setloading(false)
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
  }
  function removeItem(id) {
    deleteUserCart(id).then((req) => {
      setNumsCartItem(req.data.numOfCartItems)
      setCartData(req.data.data)
      toast.success("product deleted")
    })
      .catch((err) => { })
  }
  function clearItems() {
    clearUserCart().then((req) => {
      if (req.data.message === "success") {
        setCartData(null)
        setNumsCartItem(null)
        toast.success("Cart Cleard")
      }
    }).catch((err) => { })
  }
  function updateCount(id, count) {
    if (count < 1) return;
    updateCart(id, count).then((req) => {
      setCartData(req.data.data)
      setNumsCartItem(
        req.data.numOfCartItems ??
        req.data.data?.products?.reduce((total, product) => total + product.count, 0) ??
        0
      )
    })
  }
  if (loading) {
    return <div className='bg-slate-300 flex justify-center items-center h-screen'><span className="loader"></span></div>
  }

  const products = cartData?.products ?? [];
  const shipping = products.length ? 45 : 0;
  const tax = products.length ? Math.round(cartData.totalCartPrice * 0.14) : 0;
  const orderTotal = (cartData?.totalCartPrice ?? 0) + shipping + tax;

  return (
    <>
      <Toaster />
      {products.length > 0 ? (
        <section className='w-11/12 lg:w-10/12 mx-auto my-8'>
          <div className='mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <h1 className='text-3xl font-semibold text-slate-800'>Your Cart</h1>
              <p className='text-sm text-slate-500'>Review items before checkout.</p>
            </div>
            <button onClick={clearItems} className='w-full sm:w-auto rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white duration-300'>
              Clear cart <i className="fa-solid fa-trash-arrow-up"></i>
            </button>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <div className='lg:col-span-2 space-y-4'>
              {products.map((item) => {
                return (
                  <article key={item._id} className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                      <div className='flex items-center gap-4'>
                        <img src={item.product.imageCover} className='h-24 w-24 rounded-xl object-cover' alt={item.product.title} />
                        <div>
                          <h2 className='font-semibold text-slate-800 line-clamp-2'>{item.product.title}</h2>
                          <p className='mt-1 text-sm text-slate-500'>EGP {item.price}</p>
                          <button onClick={() => removeItem(item.product._id)} className='mt-3 text-sm font-medium text-red-600 hover:text-red-700'>
                            <i className="fa-solid fa-trash-can me-1"></i>Remove
                          </button>
                        </div>
                      </div>

                      <div className='flex items-center gap-3 self-end sm:self-center'>
                        <button onClick={() => { updateCount(item.product._id, item.count - 1) }} className='h-9 w-9 rounded-lg border border-slate-300 text-slate-700 hover:border-active hover:text-active'>
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className='min-w-8 text-center font-semibold text-slate-800'>{item.count}</span>
                        <button onClick={() => updateCount(item.product._id, item.count + 1)} className='h-9 w-9 rounded-lg border border-slate-300 text-slate-700 hover:border-active hover:text-active'>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <aside className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm h-fit'>
              <h3 className='text-lg font-semibold text-slate-800'>Order Summary</h3>
              <div className='mt-4 space-y-3 text-sm text-slate-600'>
                <div className='flex items-center justify-between'>
                  <span>Subtotal</span>
                  <span className='font-medium text-slate-800'>EGP {cartData.totalCartPrice}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Shipping</span>
                  <span className='font-medium text-slate-800'>EGP {shipping}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Tax</span>
                  <span className='font-medium text-slate-800'>EGP {tax}</span>
                </div>
                <div className='h-px bg-slate-200'></div>
                <div className='flex items-center justify-between text-base'>
                  <span className='font-semibold text-slate-800'>Total</span>
                  <span className='font-bold active'>EGP {orderTotal}</span>
                </div>
              </div>

              <Link to={'/ShipngDetals/' + cartData._id} className='btn mt-5 block text-center'>
                Proceed to pay <i className="fa-brands fa-cc-visa"></i>
              </Link>
            </aside>
          </div>
        </section>
      ) : (
        <section className='w-11/12 lg:w-10/12 mx-auto my-10'>
          <div className='rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500'>
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
            </div>
            <h2 className='text-2xl font-semibold text-slate-800'>Your cart is empty</h2>
            <p className='mt-2 text-slate-500'>Add products to start your order.</p>
            <Link to='/Home' className='btn mt-6 inline-block px-8 text-center'>
              Continue shopping
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
