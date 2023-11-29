import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'
import ClientHomePage from './Pages/Produits/HomePage'
import CreationCompte from './Pages/client/CreationCompte'
import CompteClient from './Pages/client/CompteClient'
import Panier from './Pages/client/Panier'
import ModifierCompte from './Pages/client/ModifierCompte'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact Component={ClientHomePage} />
                <Route path='/compteClient' Component={CompteClient} />
                <Route path='/register' Component={CreationCompte} />
                <Route path='/panier' Component={Panier} />
                <Route path='/editCompte' Component={ModifierCompte} />
                <Route path='/accueil' element={''}>
                    <Route path='' index element={''} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


