import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Tooltip,
    Link,
    Stack,
    Divider,
    Input,
    FormControl,
    useColorModeValue,
    Box,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'
import httpClient from '../../../httpClient';


export default function NavbarUserEspace() {
    const [email, setEmail] = useState([])
    const [nom, setNom] = useState([])
    const [prenom, setPrenom] = useState([])
    const [profil, setProfil] = useState([])
    const [password, setPassword] = useState([])

    const register = () => {
        window.location.href = "/registerClient"
    }

    const logInUser = async () => {
        console.log(email, password)

        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/loginUser", {
                email,
                password,
            });
            window.location.href = "/compteClient"
        } catch (e) {
            if (e.response.status === 409) {
                alert("La connexion a échouée. Réessayez plus tard!")
            }
        }

    };
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Tooltip hasArrow label='Espace client' bg='gray.300' color='black'>
                <Button ref={btnRef} bg={useColorModeValue('white', 'gray.700')} onClick={onOpen}>
                    <FaUserCircle fontSize={26} />
                </Button>
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Stack
                            spacing={8}
                            mx={'auto'}
                            maxW={'lg'}
                            py={3}
                            px={6}
                        >
                            <Box
                                rounded={'lg'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={5}>
                                <Stack spacing={4}>
                                    <FormControl id="email">
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            focusBorderColor="green.400"
                                            placeholder='Votre email' />
                                    </FormControl>
                                    <FormControl id="password">
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Votre mot de passe'
                                            focusBorderColor="green.400"
                                        />
                                    </FormControl>
                                    <Stack spacing={4}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Link href='/editCompte' color={'blue.400'}>Mot de passe oublié?</Link>
                                        </Stack>
                                        <Button
                                            bg={'green.400'}
                                            color={'white'}
                                            onClick={() => logInUser()}
                                            _hover={{
                                                bg: 'green.500',
                                            }}>
                                            Connexion
                                        </Button>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={2}>
                                        <Text align={'center'}>Nouveau client?</Text>

                                        <Button
                                            onClick={() => register()}
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            <Link > S'enregistrer</Link>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}