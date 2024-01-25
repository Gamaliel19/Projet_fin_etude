import React, {useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/ClientComponents/Navbar/Navbar'
import Footer from '../Components/ClientComponents/Footer'
import AuthContext from '../store/authContext'



function ClientLayoutRoot() {
    const [cart, setCart] = useState([])

    const panierCtx = useContext(AuthContext)
    const items = panierCtx.items
    const show = panierCtx.show

    return (
        <>
            <Navbar size={items.length} onClick={show}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default ClientLayoutRoot
