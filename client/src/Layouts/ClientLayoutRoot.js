import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/ClientComponents/Navbar/Navbar'
import Footer from '../Components/ClientComponents/Footer'

function ClientLayoutRoot() {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ClientLayoutRoot
