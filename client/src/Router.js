import React from 'react'; import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ClientHomePage from './Pages/Produits/HomePage'
import CreationCompte from './Pages/client/CreationCompte'
import CompteClient from './Pages/client/CompteClient'
import PanierClient from './Pages/client/PanierClient'
import ModifierCompte from './Pages/client/ModifierCompte'
import ClientLayoutRoot from './Layouts/ClientLayoutRoot'
import EditInfoClient from './Pages/client/EditInfoClient'
import EditPasswordClient from './Pages/client/EditPasswordClient'
import EditAdresseFactClient from './Pages/client/EditAdresseFactClient'
import EditAdresseLivClient from './Pages/client/EditAdresseLivClient'
import SuivreCommandesClient from './Pages/client/SuivreCommandesClient'
import GererProduitsFavorisClient from './Pages/client/GererProduitsFavorisClient'
import AdminLayoutRoot from './Layouts/AdminLayoutRoot';
import LoginAdmin from './Pages/admin/loginAdmin/LoginAdmin';
import RegisterAdmin from './Pages/admin/registerAdmin/RegisterAdmin';
import Produit from './Pages/admin/Produit'
import Inventaires from './Pages/admin/Inventaires'
import Rapports from './Pages/admin/Rapports'
import ServiceClient from './Pages/admin/ServiceClient'
import Settings from './Pages/admin/Settings'
import Cat from './Pages/admin/Cat'
import Notifications from './Pages/admin/Notificatioons'

export default function Router() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<ClientLayoutRoot />}>
                    <Route index element={<ClientHomePage />} />
                    <Route path='/registerClient' element={<CreationCompte />} />
                    <Route path='/editCompteClient' element={<ModifierCompte />} />
                    <Route path='/compteClient' element={<CompteClient />} />
                    <Route path='/panierClient' element={<PanierClient />} />
                    <Route path='/editInfoClient' element={<EditInfoClient />} />
                    <Route path='/editPasswordClient' element={<EditPasswordClient />} />
                    <Route path='/editAdresseLivClient' element={<EditAdresseLivClient />} />
                    <Route path='/editAdresseFactClient' element={<EditAdresseFactClient />} />
                    <Route path='/suivreCommandesClient' element={<SuivreCommandesClient />} />
                    <Route path='/gererProduitsFavorisClient' element={<GererProduitsFavorisClient />} />
                </Route>
                <Route path='/loginAdmin' Component={LoginAdmin} />
                <Route path='/registerAdmin' Component={RegisterAdmin} />
                <Route path='/admin' element={<AdminLayoutRoot />}>
                    <Route index element={<Produit />} />
                    <Route path='categories' element={<Cat />} />
                    <Route path='servicesClient' element={<ServiceClient />} />
                    <Route path='inventaires' element={<Inventaires />} />
                    <Route path='notifications' element={<Notifications />} />
                    <Route path='rapports' element={<Rapports />} />
                    <Route path='settings' element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


