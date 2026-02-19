import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Product from './component/Product/Product'
import Login from './component/Login/Login'
import Cart from './component/Cart/Cart'
import Signup from './component/Signup/Signup'
import Notfound from './component/Notfound/Notfound'
import Brands from './Brands/Brands'
import Category from './Category/Category'
import Forgetpassword from './ForgetPassword/Forgetpassword'
import UpdatePassword from './UpdatePassword/UpdatePassword'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRouting from './ProtectedRouting/ProtectedRouting'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Offline } from 'react-detect-offline'
import CartContextProvider from './Context/CartContextProvider'
import ShipngDetals from './component/ShupindDetals/ShipngDetals'

export default function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "home", element: <Home /> },
        { path: "product", element: <ProtectedRouting><Product /></ProtectedRouting> },
        { path: "brands", element: <ProtectedRouting><Brands /></ProtectedRouting> },
        { path: "category", element: <ProtectedRouting><Category /></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting><Cart /></ProtectedRouting> },
        { path: "ProductDetails/:id", element: <ProtectedRouting><ProductDetails /></ProtectedRouting> },
        { path: "Login", element: <Login /> },
        { path: "forgetPassword", element: <Forgetpassword /> },
        { path: "updatepassword", element: <UpdatePassword /> },
        { path: "regester", element: <Signup /> },
        { path: "ShipngDetals/:id", element: <ShipngDetals /> },
        { path: "*", element: <Notfound /> },

      ]

    }
  ])
  let client = new QueryClient();
  return <>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>

    <Offline><div className='bg-red-300 fixed bottom-6 left-6 rounded p-3'><i class="fa-solid fa-circle-exclamation"></i> You're offline right now. Check your connection.</div></Offline>
  </>
}
