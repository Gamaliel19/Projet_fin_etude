import { useContext} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../store/authContext'

const PrivateRoutes = () => {
    //let auth = { 'token': true }
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes