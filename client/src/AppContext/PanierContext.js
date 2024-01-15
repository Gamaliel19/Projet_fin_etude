import React, { createContext, useReducer } from 'react'


//Items: représente les élément present dans le panier
export const PanierContext = createContext({
    items: [],
    addItemToCart: () => { }
})


const cartReducer = (state, action) => {

    if (action.type === "AJOUTER_DANS_PANIER") {
        console.log(action)
        const updateProductCartItems = [...state.items];

        //Vérification si le produit en question existe
        const existingElementIndex = updateProductCartItems.findIndex(
            (cartItem) => cartItem._id === action.playload.productId
        );

        const existingElement = updateProductCartItems
        [existingElementIndex]


        if (existingElement) {
            //Au cas ou le produit est dans le panier
        } else {


            /*console.log(product._id)
            if (product) {
                updateProductCartItems.push({
                    _id: product._id,
                    nom_com: product.nom_com,
                    dosage: product.dosage,
                    description: product.description,
                    prix: product.prix,
                    qte: 1
                })
            }*/
        }

        return {
            items: updateProductCartItems
        }
    }

    return state;
}

export const PanierContextProvider = ({ children }) => {

    const [cartState, cartDispatch] = useReducer(cartReducer, {
        items: [],
    })

    //Fonction d'ajout d'élement au panier
    const handleAddProductToCart = (productId) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: { productId: productId }
        });
    }
    //Initialisation du panier
    const initialValue = {
        items: cartState.items,
        addItemToCart: handleAddProductToCart,
    }
    return <PanierContext.Provider value={initialValue}>
        {children}
    </PanierContext.Provider>
}