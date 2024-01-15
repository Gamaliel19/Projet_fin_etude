import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/ClientComponents/Navbar/Navbar'
import Footer from '../Components/ClientComponents/Footer'
import { PanierContextProvider } from '../AppContext/PanierContext'



function ClientLayoutRoot() {
    const [cart, setCart] = useState([])

    return (
        <PanierContextProvider>
            <Navbar size={cart.length} />
            <Outlet />
            <Footer />
        </PanierContextProvider>
    )
}

export default ClientLayoutRoot
