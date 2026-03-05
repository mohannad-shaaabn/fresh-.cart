import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/freshcart-logo.svg";
import { AuthContext } from "../../Context/AuthContextProvider";
import { CartContext } from "../../Context/CartContextProvider";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numsCartItem } = useContext(CartContext);
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    nav("/Login");
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoImg} className="h-8" alt="FreshCart Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {token && (
              <ul className="flex space-x-6 font-medium">
                <li><NavLink to="/Home">Home</NavLink></li>
                <li><NavLink to="/Product">Products</NavLink></li>
                <li><NavLink to="/brands">Brands</NavLink></li>
                <li><NavLink to="/Category">Category</NavLink></li>
              </ul>
            )}

            {/* Cart Desktop */}
            <div
              className="relative cursor-pointer"
              onClick={() => (token ? nav("/Cart") : nav("/Login"))}
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {token && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {numsCartItem}
                </span>
              )}
            </div>

            {/* Auth */}
            {token ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <>
                <NavLink to="/Login">Login</NavLink>
                <NavLink to="/regester">Register</NavLink>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center space-x-4 md:hidden">

            {/* Cart Mobile */}
            <div
              className="relative cursor-pointer"
              onClick={() => (token ? nav("/Cart") : nav("/Login"))}
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {token && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {numsCartItem}
                </span>
              )}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t pt-4 space-y-3">

            {token && (
              <>
                <NavLink onClick={closeMenu} to="/Home" className="block">Home</NavLink>
                <NavLink onClick={closeMenu} to="/Product" className="block">Products</NavLink>
                <NavLink onClick={closeMenu} to="/brands" className="block">Brands</NavLink>
                <NavLink onClick={closeMenu} to="/Category" className="block">Category</NavLink>
              </>
            )}

            {token ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="block"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink onClick={closeMenu} to="/Login" className="block">Login</NavLink>
                <NavLink onClick={closeMenu} to="/regester" className="block">Register</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}