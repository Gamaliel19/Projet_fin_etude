import {
    Box, Button, Link, Flex, FormControl, FormLabel, Heading,
    Input, Stack, useColorMode, useColorModeValue, Text, Select
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'
import httpClient from '../../httpClient'

function Register() {
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
                    <RegisterHeader />
                    <RegisterForm />
                </Box>
            </Box>
        </Flex>
    )
}
export default Register

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
const RegisterHeader = () => {
    return (
        <Box textAlign={'center'}>
            <Heading>Créer un nouveau compte</Heading>
            <Text>Remplissez correctement les champs ci-dessous!</Text>
        </Box>
    )
}

//le formulaire d'authentification
const RegisterForm = () => {
    const [email, setEmail] = useState([])
    const [nom, setNom] = useState([])
    const [prenom, setPrenom] = useState([])
    const [profil, setProfil] = useState([])
    const [password, setPassword] = useState([])

    const regisInUser = async () => {
        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/registerUser", {
                email, nom, prenom, profil, password
            })
            console.log(resp.data.prenom)
            if (profil === "admin") {
                window.location.href = "/admin"
            } else if (profil === "gerant") {
                window.location.href = "/gerant"
            } else {
                window.location.href = "/"
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert("La connexion a échouée. Réessayez plus tard!")
            }
        }
    }
    return (
        <Box my={8} textAlign={'left'}>
            <form>
                <FormControl>
                    <FormLabel>Adresse Email</FormLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Entrez votre email svp!'
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Nom</FormLabel>
                    <Input
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        type='text'
                        placeholder='Entrez votre nom svp!'
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Prenom</FormLabel>
                    <Input
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        type='text'
                        placeholder='Entrez votre prenom svp!'
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Profil</FormLabel>
                    <Select
                        placeholder='Choisir votre profil'
                        value={profil}
                        onChange={(e) => setProfil(e.target.value)}
                    >
                        <option value={'admin'}>Admin</option>
                        <option value={'gerant'}>Gérant</option>
                    </Select>
                </FormControl>
                <FormControl mt={3}>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        placeholder='Entrez votre mot de passe svp!'
                    />
                </FormControl>
                <Button
                    onClick={() => regisInUser()}
                    variant={'solid'}
                    colorScheme='teal'
                    width={'full'}
                    mt={4}>
                    Connexion
                </Button>
                <Stack color='blue.400' mt={4} textAlign={'center'}>
                    <Text>Vous avez déjà un compte? <Link href="/login" color='teal'>Connectez-vous ici!</Link></Text>
                </Stack>

            </form>
        </Box>
    )
}


/*function CustomFileUpload(props) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            // Do something with the files
        }
    })

    return (
        <FormControl {...getRootProps()}>
            <Input {...getInputProps()} />
            <Text>Glissez et déposez des fichiers ici ou cliquez pour sélectionner des fichiers</Text>
        </FormControl>
    )
}
*/