import { Button, Flex, FormControl, FormLabel, Input, Spinner, Stack } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../store/authContext'
import Wrapper from '../login/Helpers/Wrapper'
import ErrorModal from '../login/ErrorModal'

const EditVente = () => {
    const designationInputRef = useRef()
    const doseInputRef = useRef()
    const qteInputRef = useRef()

    //Appel du context
    const venteCtx = useContext(AuthContext)

    const isLoggedIn = venteCtx
    //gérer les erreurs
    const [error, setError] = useState(null)
    //isLoading,un text qui prévient que c'est en cours de chargement
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState()
    //Controler s'il ya erreur ou non
    if (error) {
        //console.log("true")
    } else {
        //console.log("false")
    }

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredDesignation = designationInputRef.current.value
        const enteredDose = doseInputRef.current.value
        const enteredQte = qteInputRef.current.value

        const url = "http://127.0.0.1:5000/editVendre"

        const fetchHandler = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        designation: enteredDesignation,
                        dose: enteredDose,
                        qte: enteredQte,
                        email: venteCtx.userEmail,
                        idUser: venteCtx.userId
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${venteCtx.token}`
                    }
                });

                const dataResponse = await response.json()

                //Le chargement terminé
                setIsLoading(false)

                if (response.ok) {
                    setData(dataResponse)
                    console.log(dataResponse)
                    venteCtx.addVente(dataResponse.designation, dataResponse.dose, dataResponse.qte)
                    //Rendre le formulaire vide après l'enregistrement
                    designationInputRef.current.value = ""
                    doseInputRef.current.value = ""
                    qteInputRef.current.value = ""
                } else {
                    setError({
                        title: "Echec d'enregistrement!",
                        message: dataResponse.error
                    })
                }
                console.log(response)

                setData(dataResponse)
            } catch (error) {
                console.log(error)
            }
        }

        //message qui prévient le chargement
        setIsLoading(true)
        fetchHandler()

    }

    const errorHandler = () => {
        setError(null)
    }
    return (
        <Wrapper>
            <Flex
                my={{ base: 10, lg: 0 }}
                position={'fixed'}
            >
                <form onSubmit={submitHandler}>
                    <Flex
                        ml={'70%'}
                        flexDir={{ base: 'column', lg: 'column' }}
                        justify={'center'}
                        align={'center'}
                    >
                        <FormControl ml={{ base: 0, lg: 2 }} mt={{ base: -20, lg: '0.5rem' }}>
                            <FormLabel >Désignation</FormLabel>
                            <Input
                                ref={designationInputRef}
                                name='designation'
                                type='text'
                                placeholder='Entrez le produit svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }} >
                            <FormLabel >Dosage</FormLabel>
                            <Input
                                ref={doseInputRef}
                                name='dose'
                                type='text'
                                placeholder='Entrez le dosage svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }} >
                            <FormLabel >Quantité</FormLabel>
                            <Input
                                ref={qteInputRef}
                                name='qte'
                                type='number'
                                placeholder='Entrez la quantité svp!'

                            />
                        </FormControl>
                    </Flex>
                    <Stack align={'center'} justify={'center'} >
                        {!isLoading &&
                            <Button
                                type='submit'
                                _hover={{ bg: 'green.700' }}
                                bg={'green.600'}
                                borderRadius={5}
                                border={'2px solid green.600'}
                                color={'white'}
                                w={'45%'}
                                mt={4}>
                                Modifier
                            </Button>
                        }
                        {isLoading && <Flex mt={5} p={'0.5rem'} justify={'center'} align={'center'} >
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='lg'
                            />
                        </Flex>}
                    </Stack>
                </form>
            </Flex>

        </Wrapper>
    )
}

export default EditVente