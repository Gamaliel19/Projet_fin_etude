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
                <Route path='/admin' element={<AdminLayoutRoot />}>
                    <Route index element={<LoginAdmin/>} />
                    <Route path='./registerAdmin' element={<RegisterAdmin/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


