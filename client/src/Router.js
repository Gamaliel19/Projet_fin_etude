import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//Import routes for Client
import ClientHomePage from './Pages/Produits/HomePage'
import CreationCompte from './Pages/client/CreationCompte'
import CompteClient from './Pages/client/CompteClient'
import PanierClient from './Pages/client/PanierClient'
import ModifierCompte from './Pages/client/ModifierCompte'
import ClientLayoutRoot from './Layouts/ClientLayoutRoot'
import EditInfoClient from './Pages/client/EditInfoClient'
import Categories from './Pages/client/Categories';
import EditPasswordClient from './Pages/client/EditPasswordClient'
import EditAdresseFactClient from './Pages/client/EditAdresseFactClient'
import EditAdresseLivClient from './Pages/client/EditAdresseLivClient'
import SuivreCommandesClient from './Pages/client/SuivreCommandesClient'
import GererProduitsFavorisClient from './Pages/client/GererProduitsFavorisClient'
import AllProduits from './Pages/client/AllProduits'
//Import routes for admin
import AdminLayoutRoot from './Layouts/AdminLayoutRoot';
import Produit from './Pages/admin/Produit'
import Inventaires from './Pages/admin/Inventaires'
import Rapports from './Pages/admin/Rapports'
import Vente from './Pages/admin/Vente'
import Settings from './Pages/admin/Settings'
import Cat from './Pages/admin/Cat'
import Notifications from './Pages/admin/Notificatioons'
import GestionUsers from './Pages/admin/GestionUsers';
//import routes for gerant
import GerantLayoutRoot from './Layouts/GerantLayoutRoot';
import EditProduct from './Pages/admin/EditProduct';
import SingleProduct from './Pages/client/SingleProduct';
import Login from './Pages/login/Login';
import PrivateRoutes from './outils/PrivateRoutes';
import EditUser from './Pages/admin/EditUser';

export default function Router() {
    return (

        <BrowserRouter>
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
                    <Route path='/allProduitsClient' element={<AllProduits />} />
                    <Route path='/singleProduct/:id' element={<SingleProduct />} />
                    <Route path='/categoriesProduitsClient' element={<Categories />} />
                </Route>

                <Route path={'/login'} Component={Login} />

                <Route element={<PrivateRoutes />}>
                    <Route path='/admin' element={<AdminLayoutRoot />}>
                        <Route index element={<Vente />} />
                        <Route path='categories' element={<Cat />} />
                        <Route path='utilisateurs' element={<GestionUsers />} />
                        <Route path='produits' element={<Produit />} />
                        <Route path='editProduct/:id' element={<EditProduct />} />
                        <Route path='editUser/:id' element={<EditUser />} />
                        <Route path='inventaires' element={<Inventaires />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='rapports' element={<Rapports />} />
                        <Route path='settings' element={<Settings />} />
                    </Route>
                </Route>
                <Route path='/gerant' element={<GerantLayoutRoot />}>
                    <Route index element={<Vente />} />
                    <Route path='categories' element={<Cat />} />
                    <Route path='produits' element={<Produit />} />
                    <Route path='inventaires' element={<Inventaires />} />
                    <Route path='notifications' element={<Notifications />} />
                    <Route path='rapports' element={<Rapports />} />
                    <Route path='settings' element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}