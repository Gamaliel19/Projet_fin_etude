import { createContext, useState } from "react";


//Creation du context pour l'authentification

const defaultValue = {
    token: "",
    userId: null,
    userEmail: "",
    userProfil: "",
    userIsLoggedIn: false,
    login: () => { },
    logout: () => { },

    //Valeur par defaut pour l'enregistrement d'un produit
    num_lot: "",
    nom_com: "",
    dosage: "",
    qte_stock: "",
    prix: "",
    date_fab: "",
    date_per: "",
    categorie: "",
    description: "",
    image: "",
    addProduct: () => { },

    //valeur par defaut pour l'enregistrement d'un utilisateur
    email: "",
    nom: "",
    prenom: "",
    profil: "",
    password: "",
    addUser: () => { },

    //Valeur par defaut pour la vente
    designation: "",
    dose: "",
    qte: "",
    addVente: () => { },

    //Pour la catégorie
    addCat: () => { },

    //ajouter au panier
    items: [],
    show: [],
    warning: [],
    addToCart: () => { }

}

const AuthContext = createContext(defaultValue)

//Le controle du token dans le cocal storage
const tokenLocalStorage = localStorage.getItem("token")
const userIdLocalStorage = localStorage.getItem("userId")
const userEmailLocalStorage = localStorage.getItem("userEmail")
const userProfilLocalStorage = localStorage.getItem("userProfil")

const itemsLocalStorage = localStorage.getItem("items")

//le  context provider pour wrapper le Router
export const AuthContextProvider = (props) => {
    //stockage du token d'authentification
    const [token, setToken] = useState(tokenLocalStorage)
    const [userId, setUserId] = useState(userIdLocalStorage)
    const [userEmail, setUserEmail] = useState(userEmailLocalStorage)
    const [userProfil, setUserProfil] = useState(userProfilLocalStorage)

    //stockage des informations du produit
    const [num_lot, setNum_lot] = useState([])
    const [nom_com, setNom_com] = useState([])
    const [dosage, setDosage] = useState([])
    const [qte_stock, setQte_stock] = useState([])
    const [prix, setPrix] = useState([])
    const [date_fab, setDate_fab] = useState([])
    const [date_per, setDate_per] = useState([])
    const [categorie, setCategorie] = useState([])
    const [description, setDescription] = useState([])
    const [image, setImage] = useState([])

    //Stockage des informations de l'user
    const [email, setEmail] = useState([])
    const [nom, setNom] = useState([])
    const [prenom, setPrenom] = useState([])
    const [profil, setProfil] = useState([])
    const [password, setPassword] = useState([])

    //Stockage des informations pour la vente
    const [designation, setDesignation] = useState([])
    const [dose, setDose] = useState([])
    const [qte, setQte] = useState([])

    //Pour l'ajouter au panier
    const [items, setItems] = useState([])
    const [show, setShow] = useState(false)
    const [warning, setWarning] = useState(false)


    //mise  à jour du token dans le state
    const loginHandler = (token, userId,userEmail, userProfil) => {
        setToken(token)
        setUserId(userId)
        setUserEmail(userEmail)
        setUserProfil(userProfil)
        //mettre les donnée  dans le localStorage
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
        localStorage.setItem("userEmail", userEmail)
        localStorage.setItem("userProfil", userProfil)
    }
    //function pour se déconnecter(faire passer le token à null)
    const logoutHandler = () => {
        setToken(null)
        setUserId(null)
        setUserEmail(null)
        setUserProfil(null)
        //supprimer les données dans le local storage
        localStorage.clear()
        window.location.href = '/login'

    }
    //function pour l'enregistrement d'un produit
    const addProductHandler = (num_lot, image, categorie, nom_com, dosage, qte_stock, prix, date_fab, date_per, description) => {
        setNum_lot(num_lot)
        setNom_com(nom_com)
        setDosage(dosage)
        setQte_stock(qte_stock)
        setPrix(prix)
        setDate_fab(date_fab)
        setDate_per(date_per)
        setCategorie(categorie)
        setDescription(description)
        setImage(image)
    }
    //function pour enregistrer un User
    const addUserHandler = (email, nom, prenom, profil, password) => {
        setEmail(email)
        setNom(nom)
        setPrenom(prenom)
        setProfil(profil)
        setPassword(password)
    }
    //Function pour enregistrer une vente
    const addVenteHandler = (designation, dose, qte) => {
        setDesignation(designation)
        setDose(dose)
        setQte(qte)
    }
    //Function pour add une catégorie
    const addCatHandler = (nom) => {
        setNom(nom)
    }

    //fonctionpour ajouter au panier
    const addToCartHandler = (item) => {
        console.log(item)
        let isPresent = false
        items.forEach((product) => {
            if (item._id === product._id)
                isPresent = true
        })
        if (isPresent) {
            setWarning(true)
            setTimeout(() => {
                setWarning(false)
            }, 2000)
            return;
        }
        setItems([...items, item])
        //mettre les donnée  dans le localStorage
        //localStorage.setItem("items", item)
    }

    //S'il y a la présence du token ça veut dire que je suis loggé
    //Convertir le token en valeur booléenne
    const userIsLoggedIn = !!token
    console.log("--> userIsLoggedIn")
    console.log(userIsLoggedIn)

    //la valeur du context
    const contextValue = {
        //pour l'authentification
        token: token,
        userId: userId,
        userEmail: userEmail,
        userProfil: userProfil,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        //pour l'enregistrement d'un produit
        num_lot: num_lot,
        nom_com: nom_com,
        dosage: dosage,
        qte_stock: qte_stock,
        prix: prix,
        date_fab: date_fab,
        date_per: date_per,
        description: description,
        categorie: categorie,
        image: image,
        addProduct: addProductHandler,
        //Pour créer un User
        email: email,
        nom: nom,
        prenom: prenom,
        profil: profil,
        password: password,
        addUser: addUserHandler,

        //Pour enregistrer une vente
        designation: designation,
        dose: dose,
        qte: qte,
        addVente: addVenteHandler,

        //Pour l'ajout au panier
        items: items,
        show: show,
        warning: warning,
        addToCart: addToCartHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext