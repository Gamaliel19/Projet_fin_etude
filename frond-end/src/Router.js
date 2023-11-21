import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Dashboard from './Page/Dashboard'
import Vente from './Page/Vente'
import Stock from './Page/Stock'
import Inventaire from './Page/Inventaire'
import Settings from './Page/Settings'
import Compte from './Page/Compte'
import { Switch } from '@chakra-ui/react'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact Component={''} />
                <Route path='/register' Component={''} />
            </Routes>
        </BrowserRouter>
    )
}


