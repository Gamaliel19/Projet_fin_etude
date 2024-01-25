import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    Box, Button, Flex, FormControl, FormLabel, Heading,
    IconButton, Input, InputGroup, InputLeftElement, Select,
    Spacer, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Table,
    TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import Wrapper from '../login/Helpers/Wrapper'
import ErrorModal from '../login/ErrorModal'


function GestionUsers() {
    const userCtx = useContext(AuthContext)
    const [users, setUsers] = useState([])
    //Pour rechercher un utilisateur
    const [result, setResult] = useState([])
    const [filterData, setFilterData] = useState([])

    const handleChange = (value) => {
        const res = filterData.filter(f => f.nom.toLowerCase().includes(value))
        setResult(res)
        if (value === "") {
            setResult([])
        }
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/listUser", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userCtx.token}`
            }
        })
            .then(resp => resp.json())
            .then(data => setUsers(data))

        fetch("http://127.0.0.1:5000/listUser")
            .then(resp => resp.json())
            .then(data => {
                setFilterData(data)
            })
    }, [])


    return (
        <>
            <Flex
                mt={-4}
                flexDir={'column'}
                ml={{ base: 0, lg: '15.6rem' }}
            >
                <Box
                    position={'fixed'}
                    w={'100%'}
                    h={{ base: '17.5vh', lg: '16vh', xl: '15vh' }}
                    bg={useColorModeValue('white', 'black')}
                    zIndex={2}
                ></Box>
                <Flex
                    mt={{ base: '1rem', lg: 5 }}
                    display={{ base: 'none', lg: 'flex' }}
                    align={'center'}
                    justify={'center'}
                    flexDir={'row'}
                    zIndex={10}
                >

                    <Box
                        position={'fixed'}
                        right={{ base: '40%', lg: '48%', xl: '60%' }}
                        mt={0}
                    >
                        <Heading mt={5} fontSize={20}>
                            Gestionnaires des utilisateurs
                        </Heading>
                    </Box>
                    <Spacer />

                    <Box
                        mt={3}
                        position={'fixed'}
                        left={{ base: '16%', lg: '63%' }}
                        p={'0.5rem 2rem'}
                    >
                        <InputGroup
                            size={'sm'}
                            w={{ base: '100%', lg: '20rem' }}
                            boxShadow={'md'}
                            // bg={useColorModeValue('white', 'gray.700')}
                            rounded={'lg'}
                            p={1}
                        >
                            <InputLeftElement
                                margin={1}
                                children={<FaSearch />}
                                _hover={{ cursor: 'pointer' }}
                                bg={useColorModeValue('gray.700', 'gray.400')}
                                borderLeftRadius={5}
                                color={'white'}
                                focusBorderColor="gray.700"
                            />
                            <Input
                                type="text"
                                onChange={(e) => handleChange(e.target.value)}
                                bg={'transparent'}
                                placeholder="Rechercher..."
                                focusBorderColor="green.400"
                                borderWidth={'2px'}
                                borderRadius={5}
                                borderColor={'gray.400'}
                            />
                        </InputGroup>
                        <Flex
                            ml={2.5}
                            w={{ base: '100%', lg: '20rem' }}
                            justify={'center'}
                            align={'center'}
                            boxShadow={'md'}
                            my={2}
                            position={{ base: 'relative', lg: 'absolute' }}
                            bg={useColorModeValue('white', 'gray.400')}
                        >
                            <TableContainer>
                                <Table>
                                    <Tbody>
                                        {Object.values(result).map(item => {
                                            return <Tr>
                                                <Link to={`/singleProduct/${item.id}`}>
                                                    <Td textAlign={'center'}>{item.nom}</Td>
                                                    <Td textAlign={'center'}> {item.prenom}</Td>
                                                    <Td textAlign={'center'}>{item.profil}</Td>
                                                </Link>
                                            </Tr>
                                        })
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </Box>

                </Flex>

                <Stack
                    ml={5}
                    mt={{ base: -19.5, lg: '1rem' }}
                    mr={'1rem'}
                >
                    <Flex flexDir={'column'} w={'100%'}>
                        <Tabs colorScheme='blue' variant={'enclosed'}>
                            <TabList
                                position={'fixed'}
                                mt={{ base: '3rem', lg: '1.5rem' }}
                                ml={{ base: '-5', lg: '' }}
                                justifyItems={'center'}
                                alignItems={'center'}
                                w={{ base: '100%', lg: '90%' }}
                                flexDir={{ base: 'column', lg: 'row' }}
                                zIndex={3}
                            >
                                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Liste des utilisateurs</Tab>
                                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Créer un utilisateur</Tab>
                            </TabList>
                            <TabPanels mt={{ base: '10rem', lg: '5rem' }}>
                                <TabPanel>
                                    <ListeUsers items={users} />
                                </TabPanel>

                                <TabPanel>
                                    <UserForm />
                                </TabPanel>

                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Stack>

            </Flex>
        </>
    )
}
export default GestionUsers

function ListeUsers({ items }) {
    return (
        <>
            <Box
                position={'fixed'}
                w={'100%'}
                h={'3vh'}
                bg={useColorModeValue('white', 'black')}
            >
            </Box>
            <Heading
                pos={'fixed'}
                fontSize={20}
                left={{ base: '29%', lg: '50%' }}
                zIndex={1}
                w={'100%'}
            >
                Liste des utilisateurs
            </Heading>
            <TableContainer mt={'2rem'}>
                <Table colorScheme="teal">
                    <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
                        <Tr id='titre' bgColor={'blue.200'}>
                            <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Id</Th>
                            <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Email</Th>
                            <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Nom & Prenoms</Th>
                            <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Profil</Th>
                            <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'} w={2}>Actions</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {Object.values(items).map(item => {
                            return <Tr>
                                <Td>{item.id}</Td>
                                <Td>{item.email}</Td>
                                <Td textAlign={'start'}>{item.nom} {item.prenom}</Td>
                                <Td textAlign={'center'}>{item.profil}</Td>
                                <Td textAlign={'center'}>
                                    <Link to={`/admin/editUser/${item.id}`}>
                                        <IconButton
                                            icon={<FaEdit />}
                                            color={'green'}
                                        />
                                    </Link>
                                    <IconButton
                                        ml={2}
                                        icon={<FaTrash color={'red'} />}
                                        onClick={e => deleteUser(item.id)}
                                    />
                                </Td>
                            </Tr>
                        })
                        }
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    )
    function deleteUser(id) {
        const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer cet utilisateur?")
        if (conf) {
            axios.delete('http://localhost:5000/deleteUser/' + id)
                .then(res => {
                    alert('Cet utilisateur a été supprimé avec succès!')
                    window.location.href = '/admin/utilisateurs'
                }).catch(err => console.log(err))
        }
    }
}

const UserForm = () => {
    const emailInputRef = useRef()
    const nomInputRef = useRef()
    const prenomInputRef = useRef()
    const profilInputRef = useRef()
    const passwordInputRef = useRef()

    //utilisation du context
    const userCtx = useContext(AuthContext)
    console.log(userCtx)
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

        const enteredEmail = emailInputRef.current.value
        const enteredNom = nomInputRef.current.value
        const enteredPrenom = prenomInputRef.current.value
        const enteredProfil = profilInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        //Appel du api flask
        const url = "http://localhost:5000/registerUser"
        //la function asynchrone d'appel d'api
        const fetchHandler = async () => {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: enteredEmail,
                        nom: enteredNom,
                        prenom: enteredPrenom,
                        profil: enteredProfil,
                        password: enteredPassword
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userCtx.token}`
                    }
                });

                const dataResponse = await response.json()

                //le server a repondu,le chargement terminé
                setIsLoading(false)

                if (response.ok) {
                    setData(dataResponse)
                    console.log(dataResponse)
                    userCtx.addUser(dataResponse.email, dataResponse.nom, dataResponse.prenom, dataResponse.profil, dataResponse.password)
                    //Rendre le formulaire vide
                    emailInputRef.current.value = ""
                    nomInputRef.current.value = ""
                    prenomInputRef.current.value = ""
                    profilInputRef.current.value = ""
                    passwordInputRef.current.value = ""
                } else {
                    setError({
                        title: " Attention! Echec de création.",
                        message: dataResponse.error,
                    })
                }
                console.log(response)

                setData(dataResponse)

            } catch (eror) {
                console.log(eror)
            }
        }

        //message qui previent le chargement
        setIsLoading(true)
        fetchHandler()

    }
    const errorHandler = () => {
        setError(null)
    }
    console.log(data)

    return (
        <Wrapper>
            {error &&
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            }
            <Box
                position={'fixed'}
                w={'100%'}
                h={'3vh'}
                bg={useColorModeValue('white', 'black')}
            >
            </Box>
            <Heading
                pos={'fixed'}
                fontSize={20}
                left={{ base: '23%', lg: '50%' }}
                zIndex={1}
                w={'100%'}
            >
                Création d'un utilisateur
            </Heading>
            <Flex
                position={{ base: 'relative', lg: 'fixed' }}
                my={2}
                align={'center'}
                right={{ lg: '-8rem' }}
                mt={'3rem'}
                justify={'center'}
                w={'100%'}
            >
                <form onSubmit={submitHandler}>
                    <Flex
                        align={'center'}
                        flexDir={{ base: 'column', lg: 'row' }}
                        justify={'center'}
                    >
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                ref={emailInputRef}
                                name='email'
                                type='email'
                                placeholder='Entrez votre email svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }}>
                            <FormLabel>Nom </FormLabel>
                            <Input
                                ref={nomInputRef}
                                name='nom'
                                type='text'
                                placeholder='Entrez votre nom svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }}>
                            <FormLabel>Prenom</FormLabel>
                            <Input
                                ref={prenomInputRef}
                                name='prenom'
                                type='text'
                                placeholder='Entrez votre prenom svp!'
                            />
                        </FormControl>
                    </Flex>
                    <Flex
                        align={'center'}
                        justify={'center'}
                        flexDir={{ base: 'column', lg: 'row' }}
                    >
                        <FormControl>
                            <FormLabel>Profil</FormLabel>
                            <Select
                                ref={profilInputRef}
                                placeholder='Choisir votre profil'
                                name='profil'
                            >
                                <option value={'admin'}>Admin</option>
                                <option value={'gerant'}>Gérant</option>
                                <option value={'gestionnaire'}>Gestionnaire</option>
                                <option value={'livreur'}>Livreur</option>
                            </Select>
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }}>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                ref={passwordInputRef}
                                name='password'
                                type='password'
                                placeholder='Entrez votre mot de passe svp!'
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
                                color={'white'}
                                border={'2px solide black'}
                                p={'0.5rem 2rem'}
                                mt={4}>
                                Créer utilisateur
                            </Button>}
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