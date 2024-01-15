import { Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { PanierContext } from '../../../AppContext/PanierContext'

export const AddToCardButton = ({ product}) => {
    //Ajout au panier
    const { addItemToCart } = useContext(PanierContext)

    return (
        <Button
            variant={'outline'}
            borderColor={'blue.400'}
            color={'blue.400'}
            rounded={'full'}
            size={'sm'}
            w={'150px'}
            onClick={() => addItemToCart(product._id)}
        >
            Ajouter au panier
        </Button>
    )
}
