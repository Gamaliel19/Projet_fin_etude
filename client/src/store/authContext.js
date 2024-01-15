import { createContext, useState } from "react";


//Creation du context pour l'authentification

const defaultValue = {
    token: "",
    userId: null,
    userNom: "",
    userProfil: "",
    userIsLoggedIn: false,
    login: () => { },
    logout: () => { }
}

const AuthContext = createContext(defaultValue)

//Le controle du token dans le cocal storage
const tokenLocalStorage = localStorage.getItem("token")
const userIdLocalStorage = localStorage.getItem("userId")
const userNomLocalStorage = localStorage.getItem("userNom")
const userProfilLocalStorage = localStorage.getItem("userProfil")

//le  context provider pour wrapper le Router
export const AuthContextProvider = (props) => {
    //stockage du token d'authentification
    const [token, setToken] = useState(tokenLocalStorage)
    const [userId, setUserId] = useState(userIdLocalStorage)
    const [userNom, setUserNom] = useState(userNomLocalStorage)
    const [userProfil, setUserProfil] = useState(userProfilLocalStorage)

    //mise  à jour du token dans le state
    const loginHandler = (token, userId, userNom, userProfil) => {
        setToken(token)
        setUserId(userId)
        setUserNom(userNom)
        setUserProfil(userProfil)
        //mettre les donnée  dans le localStorage
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
        localStorage.setItem("userNom", userNom)
        localStorage.setItem("userProfil", userProfil)
    }
    //function pour se déconnecter(faire passer le token à null)
    const logoutHandler = () => {
        setToken(null)
        setUserId(null)
        setUserNom(null)
        setUserProfil(null)
        //supprimer les données dans le local storage
        localStorage.clear()
        window.location.href = '/login'
    }

    //S'il y a la présence du token ça veut dire que je suis loggé
    //Convertir le token en valeur booléenne
    const userIsLoggedIn = !!token
    console.log("--> userIsLoggedIn")
    console.log(userIsLoggedIn)

    //la valeur du context
    const contextValue = {
        token: token,
        userId: userId,
        userNom: userNom,
        userProfil: userProfil,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext