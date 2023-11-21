import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from './Page/Dashboard'
import { CSSReset, ColorModeProvider, ThemeProvider, theme } from "@chakra-ui/react";
import Vente from "./Page/Vente";
import Stock from "./Page/Stock";
import Inventaire from "./Page/Inventaire";
import Settings from "./Page/Settings";
import Compte from "./Page/Compte";
import Notification from "./Page/Notification";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="ventes" element={<Vente />} />
            <Route path="stock" element={<Stock />} />
            <Route path="invent" element={<Inventaire />} />
            <Route path="settings" element={<Settings />} />
            <Route path="compte" element={<Compte />} />
            <Route path="notifications" element={<Notification />} />
        </Route>
    )
)
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <ColorModeProvider>
                <CSSReset />
                <RouterProvider router={router} />
            </ColorModeProvider>
        </ThemeProvider>

    )
}