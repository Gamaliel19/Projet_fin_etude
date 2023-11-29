import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Stack,
    Text,
    Checkbox,
    useColorModeValue,
    Divider,
    Tooltip,
} from '@chakra-ui/react'
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"
import AppLogo from '../AppLogo'
import { Search } from '../Recherche/Recherche'
import httpClient from '../../httpClient'
import ColorModeToggle from '../ColorModeToggle'

export default function DesktopNav() {
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])


    const logInUser = async () => {
        console.log(email, password)

        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/login", {
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
    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            px={'2rem'}
            py={'1rem'}
            borderBottomWidth={'1px'}
            borderColor={'gray.200'}
            display={{ base: "none", lg: "flex" }}

        >
            <Stack
                direction={'row'}
                gap={6}
                flex={1}
                alignItems={'center'}
                justify={'center'}
            >
                <Box><AppLogo /></Box>
                <Box
                    justifyContent={'center'}
                >
                    <Search />
                </Box>
            </Stack>
            <Stack
                direction={'row'}
            >

                <Flex>
                    <Menu>
                        <MenuButton as={Button} bg={'transparent'} fontSize={15} leftIcon={<FaUserCircle fontSize={26} />}>
                            Espace client
                        </MenuButton>

                        <MenuList>
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
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                placeholder='Votre mot de passe'
                                                focusBorderColor="green.400"
                                            />
                                        </FormControl>
                                        <Stack spacing={10}>
                                            <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}>
                                                <Checkbox borderColor={'gray.400'}>Se souvenir de moi</Checkbox>
                                                <Link href='/editCompte' color={'blue.400'}>Mot de passe oublié?</Link>
                                            </Stack>
                                            <Button
                                                onClick={() => logInUser()}
                                                bg={'green.400'}
                                                color={'white'}
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
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                <Link href='/register'> S'enregistrer</Link>
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>

                        </MenuList>
                    </Menu>
                </Flex>
                <Flex>
                    <Link href='/panier'>
                        <Button bg={'transparent'}>
                            <FaShoppingCart fontSize={26} />
                            <Text ml={2} fontSize={15} >Mon panier</Text>
                        </Button>
                    </Link>
                </Flex>
                <ColorModeToggle />
            </Stack>
        </Flex>
    )
}