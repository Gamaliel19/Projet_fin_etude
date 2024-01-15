import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }
    const logout = () => {
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = () => { 
    return useContext(AuthContext) 
}

export default AuthContext;