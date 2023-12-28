import {
    Box, Button, Link, Flex, FormControl, FormLabel, Heading,
    Input, Stack, useColorMode, useColorModeValue, Text, Checkbox, FormHelperText
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'
import httpClient from '../../httpClient'


function Login() {
    return (
        <Flex
            justify={'center'}
            align={'center'}
            minHeight={'100vh'}
            p={{ base: "1rem", lg: "4rem" }}
            mx={'auto'}
            bg={useColorModeValue('white', 'gray.700')}
        >
            <Box
                p={4}
                w={{ base: "100%", lg: "50%" }}
                maxWidth={'500px'}
                borderRadius={5}
                textAlign={'center'}
                boxShadow={'lg'}
            >
                <ColorModeToggle />
                <Box p={4}>
                    <LoginHeader />
                    <LoginForm />
                </Box>
            </Box>
        </Flex>
    )
}

export default Login

//Toogle color
function ColorModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box textAlign={'right'} py={4}>
            <Button
                bg={'transparent'}
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                _focus={{ boxShadow: 'none' }}>
                {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
            </Button>
        </Box>
    )
}

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
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const isError = email === ''

    const logInAdmin = async () => {
        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/loginUser", {
                email,
                password
            })
            console.log(resp.data.email)
            if (email === "yagalinaf@gmail.com") {
                window.location.href = "/admin"
            } else {
                window.location.href = "/gerant"
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert("La connexion a échouée. Réessayez plus tard!")
            }
        }
    }

    return (
        <Box my={8} textAlign={'left'}>
            <form>
                <FormControl isInvalid={isError} isRequired>
                    <FormLabel>Adresse Email</FormLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Entrez votre email svp!'
                    />
                    {!isError ? (
                        <FormHelperText>Entrez correctement l'email!</FormHelperText>
                    ) : (
                        <FormHelperText>L'email est obligatoire!</FormHelperText>
                    )}
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Entrez votre mot de passe svp!'
                    />
                </FormControl>
                <Stack mt={5}>
                    <Checkbox borderColor={'gray'} borderRadius={'50%'}>Admin</Checkbox>
                </Stack>
                <Button
                    onClick={() => logInAdmin()}
                    variant={'solid'}
                    colorScheme='teal'
                    width={'full'}
                    mt={4}>
                    Connexion
                </Button>
                <Stack color='blue.400' mt={4} textAlign={'center'}>
                    <Text>Vous n'avez pas de compte? <Link href="/register" color='teal'>Créez ici!</Link></Text>
                </Stack>

            </form>
        </Box>
    )
}
