import {
    Box, Button, Flex, FormControl, FormLabel, Heading,
    Input, Spinner
} from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import ErrorModal from './ErrorModal'
import Wrapper from './Helpers/Wrapper'
import AuthContext from '../../store/authContext'
import { Navigate } from 'react-router-dom'


function Login() {
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    console.log(authCtx)

    if (isLoggedIn & authCtx.userProfil === 'admin') {
        return <Navigate to={'/admin'} />
    } else if (isLoggedIn & authCtx.userProfil === 'gerant') {
        return <Navigate to={'/gerant'} />
    }
    return (
        <>
            {!isLoggedIn && <Flex
                justify={'center'}
                align={'center'}
                minHeight={'100vh'}
                p={{ base: "1rem", lg: "4rem" }}
                mx={'auto'}
            //bg={useColorModeValue('white', 'gray.700')}
            >

                <Box
                    p={4}
                    w={{ base: "100%", lg: "50%" }}
                    maxWidth={'500px'}
                    borderRadius={5}
                    textAlign={'center'}
                    boxShadow={'6px 5px 8px 2px #086251'}
                >
                    {/*<ColorModeToggle />*/}

                    <Box p={4}>
                        <LoginHeader />
                        <LoginForm />
                    </Box>
                </Box>
            </Flex>}
            {/*isLoggedIn ? <Navigate to={'/admin'}/> : <Navigate to={'/gerant'}/> */}
        </>
    )
}
export default Login
//l'en-tête de la page d'authentification
const LoginHeader = () => {
    return (
        <Box textAlign={'center'}>
            <Heading>Authentification</Heading>
        </Box>
    )
}
//le formulaire d'authentification
const LoginForm = () => {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    //utilisation du context
    const authCtx = useContext(AuthContext)
    console.log(authCtx)

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

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        //Controler si les champs ne sont pas vides
        if (
            enteredEmail.trim().length === 0 ||
            enteredPassword.trim().length === 0
        ) {
            setError({
                title: "Un ou plusieurs champs sont vides!",
                message: "Veuillez entrer votre email et ou votre mot de passe."
            })
            return
        }
        //Controler si l'email est valide
        const regExEmail = (value) => {
            return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
        }
        if (!regExEmail(enteredEmail)) {
            setError({
                title: "Format de l'email invalid!",
                message: "Veuillez entrer correctement votre adresse email svp!"
            })
            return
        }


        //Récupérer le userId et le token d'authentification
        const url = "http://localhost:5000/loginUser"
        //async function fetch
        const fetchHandler = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const dataResponse = await response.json()

                //le sever a repondu, le chargement a terminé
                setIsLoading(false)

                if (response.ok) {
                    setData(dataResponse)
                    console.log(dataResponse)
                    authCtx.login(dataResponse.token, dataResponse.userId, dataResponse.userNom, dataResponse.userProfil)
                } else {
                    setError({
                        title: "Echec d'authentification!",
                        message: dataResponse.error
                    })
                }
                console.log(response)

                setData(dataResponse)
            } catch (error) {
                console.log(error)
            }
        };

        //message qui previent le chargement
        setIsLoading(true)
        fetchHandler()

        //Rendre vide le formulaire
        /*emailInputRef.current.value = ""
        passwordInputRef.current.value = ""
        */
    }
    const errorHandler = () => {
        setError(null)
    }
    console.log(data)

    return (
        <Wrapper>
            {error && <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={errorHandler}
            />
            }
            <Box my={8} textAlign={'left'} >
                <form onSubmit={submitHandler}>
                    <Flex
                        flexDir={'column'}
                        align={'center'}
                        justify={'center'}
                    >
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Adresse Email</FormLabel >
                            <Input
                                //value={user.email}
                                ref={emailInputRef}
                                name='email'
                                //onChange={(e) => handleChange(e)}
                                type='email'
                                placeholder='Entrez votre email svp!'
                            />
                        </FormControl >
                        <FormControl mt={4} >
                            <FormLabel fontWeight={'bold'}>Mot de passe</FormLabel>
                            <Input
                                //value={user.password}
                                ref={passwordInputRef}
                                name='password'
                                //onChange={(e) => handleChange(e)}
                                type='password'
                                placeholder='Entrez votre mot de passe svp!'
                            />
                        </FormControl>
                    </Flex>
                    {!isLoading && <Flex align={'center'} justify={'center'}>
                        <Button
                            type='submit'
                            border={'1px solide teal'}
                            variant={'solid'}
                            colorScheme='teal'
                            p={'0.5rem 4rem'}
                            mt={4}>
                            Se connecter
                        </Button>
                    </Flex>}
                    {isLoading && <Flex mt={5} p={'0.5rem'} justify={'center'} align={'center'} >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='lg'
                        />
                    </Flex>}
                </form >
            </Box >
        </Wrapper>
    )
}
