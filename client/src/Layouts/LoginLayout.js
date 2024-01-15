import React from 'react'
import Login from '../Pages/login/Login'
import { useAuth } from '../outils/AuthContext'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/AdminComponents/Navbar/Navbar'

function LoginLayout() {
    return (
        <div>
            <Navbar />
            <Login />
            <Outlet />
        </div>
    )
}
export default LoginLayout