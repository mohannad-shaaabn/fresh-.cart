import React from 'react'
<<<<<<< HEAD
import Navbar from '../Navbar/Navbar'
=======
import NAvbar from '../Navbar/NAvbar'
>>>>>>> 0d28195 (Initial commit)
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
<<<<<<< HEAD
        <Navbar />
=======
        <NAvbar />
>>>>>>> 0d28195 (Initial commit)
        <div className="flex-grow"> 
            <Outlet />
        </div>
        <Footer />
    </div>
    )
}
