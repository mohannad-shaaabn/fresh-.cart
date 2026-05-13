import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContextProvider'
import { CartContext } from '../../Context/CartContextProvider'

export default function Navbar() {
  let { setToken, isAuthenticated } = useContext(AuthContext)
  let { numsCartItem } = useContext(CartContext)
  let nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    nav('/Login')
  }

  return (
    <nav className="animate-fade-in bg-white border-gray-200 shadow">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center mx-auto p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logoImg} className="h-8" alt="" />
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex items-center p-2 ms-auto w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          )}
        </button>

        <div className={`${isMenuOpen ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'} overflow-hidden transition-all duration-300 ease-in-out w-full md:max-h-none md:opacity-100 md:overflow-visible md:flex md:flex-1 md:items-center md:justify-between md:ms-6 md:mt-0`} id="navbar-default">
          {isAuthenticated && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:gap-1 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li><NavLink to="/Home" className="block py-2 px-3">Home</NavLink></li>
              <li><NavLink to="/Product" className="block py-2 px-3">products</NavLink></li>
              <li><NavLink to="/Cart" className="block py-2 px-3">Cart</NavLink></li>
              <li><NavLink to="/brands" className="block py-2 px-3">brands</NavLink></li>
              <li><NavLink to="/Category" className="block py-2 px-3">category</NavLink></li>
            </ul>
          )}

          <ul className="md:ms-auto font-medium flex flex-col md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:gap-1 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li className='px-3 py-2 md:py-0'><i className="fa-brands fa-facebook"></i></li>
            <li className='px-3 py-2 md:py-0'><i className="fa-brands fa-twitter"></i></li>
            <li className='px-3 py-2 md:py-0'><i className="fa-brands fa-instagram"></i></li>
            <li className='px-3 py-2 md:py-0'><i className="fa-brands fa-youtube"></i></li>

            <li className="block py-2 px-3 relative cursor-pointer" onClick={() => {
              if (isAuthenticated) {
                nav('/Cart');
              } else {
                nav('/Login');
              }
            }}>
              <i className="fa-solid fa-cart-shopping" />
              {isAuthenticated && (
                <span className='absolute top-0 end-0 bg-active h-[15.3px] w-[15.3px] rounded-[100%] text-center text-[11px] text-white animate-fade-in'>
                  {numsCartItem}
                </span>
              )}
            </li>

            {isAuthenticated ? (
              <li>
                <Link onClick={logout} to="" className="block py-2 px-3">logout</Link>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/Login" className="block py-2 px-3">login</NavLink>
                </li>
                <li>
                  <NavLink to="/regester" className="block py-2 px-3">regester</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
