import React, { useEffect, useState } from 'react'
import {
    Box, Button, Flex, FormControl, FormLabel, Heading,
    IconButton, Input, InputGroup, InputLeftElement, Select,
    Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Table,
    TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import httpClient from '../../httpClient'


function GestionUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/listUser")
            .then(resp => resp.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <Flex
            flexDir={'column'}
            mt={{ base: '3rem', lg: 8 }}
            minHeight={'100vh'}
            ml={{ base: 0, lg: '15.6rem' }}
        >
            <Flex
                display={{ base: 'none', lg: 'flex' }}
                align={'center'}
                justify={'center'}
                flexDir={'row'}
                zIndex={10}
            >
                <Box
                    position={'fixed'}
                    right={{ base: '40%', lg: '53%', xl: '63%' }}
                    mt={0}
                >
                    <Heading
                        mt={5}
                        fontSize={20}
                    >
                        Gestion des utilisateurs
                    </Heading>
                </Box>
                <Spacer />
                <Box
                    mt={3}
                    //mr={50}
                    position={'fixed'}
                    left={{ base: '16%', lg: '63%' }}
                    p={'0.5rem 2rem'}
                //bg={useColorModeValue('white', 'gray.700')}
                >
                    <FormControl ml={{ base: 0, lg: 2 }}>
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
                                value={''}
                                onChange={() => { }}
                                bg={'transparent'}
                                placeholder="Rechercher..."
                                focusBorderColor="green.400"
                                borderWidth={'2px'}
                                borderRadius={5}
                                borderColor={'gray.400'}
                            />
                        </InputGroup>
                    </FormControl>
                </Box>
            </Flex>
            <Stack
                ml={5}
                mt={{ base: -20, lg: 5 }}
                mr={'1rem'}
            >
                <Flex flexDir={'column'} w={'100%'}>
                    <Tabs >
                        <TabList
                            position={'fixed'}
                            mt={{ base: '3rem', lg: '1.5rem' }}
                            ml={{ base: '-5', lg: '' }}
                            justifyItems={'center'}
                            alignItems={'center'}
                            w={{ base: '100%', lg: '90%' }}
                            flexDir={{ base: 'column', lg: 'row' }}
                        >
                            <Tab>Liste des utilisateurs</Tab>
                            <Tab>Créer un utilisateur</Tab>
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
    )
}
export default GestionUsers

function ListeUsers({ items }) {
    return (
        <Flex my={2} flexDir={'column'} zIndex={'-10'}>
            <Flex
                my={2}
                align={'center'}
                mt={'3rem'}
                justify={'center'}
                w={'100%'}
            >
                <TableContainer>
                    <Table colorScheme="teal">
                        <Thead>
                            <Tr id='titre' bgColor={'gray.600'}>
                                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Messagerie Électronique</Th>
                                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'20rem'}>Nom & Prenoms</Th>
                                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Profil</Th>
                                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Actions</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {Object.values(items).map(item => {
                                return <Tr>
                                    <Td>{item.email}</Td>
                                    <Td textAlign={'start'}>{item.nom} {item.prenom}</Td>
                                    <Td>{item.profil}</Td>
                                    <Td>
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

            </Flex>
        </Flex>
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
    const [user, setUser] = useState({
        email: "",
        nom: "",
        prenom: "",
        profil: "",
        password: ""
    })

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const addUser = async () => {
        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/registerUser", { ...user })
            window.location.href = "../admin/utilisateurs"
            setUser({
                email: "",
                nom: "",
                prenom: "",
                profil: "",
                password: ""
            })
            console.log(resp.data)
        } catch (error) {
            if (error.response.status === 408) {
                alert("Cet utilisateur existe déjà. Veuillez vous connecter à votre compte utilisateur!")
            } else if (error.response.status === 409) {
                alert("Le mot de passe est trop court. Veuillez entrer au moins 8 caractères!")
            } else if (error.response.status === 410) {
                alert("Le mot de passe doit contenir au moins un chiffre!")
            } else if (error.response.status === 411) {
                alert("Le mot de passe doit contenir au moins un caractère spécial!")
            } else if (error.response.status === 412) {
                alert("Le mot de passe doit contenir au moins une lettre majuscule!")
            } else if (error.response.status === 413) {
                alert("Email incorrect. Veuillez entrer un format valide de l'email!")
            }
        }
    }

    useEffect(() => { }, [user])

    return (
        <Flex my={2} flexDir={'column'} zIndex={'-10'}>
            <Flex
                mt={{ base: '-3', lg: '-1rem' }}
                mb={{ base: 8, lg: 0 }}
                left={{ lg: '50%' }}
                justify={'center'}
                align={'center'}
                position={'fixed'}
            >
                <Heading fontSize={22}>
                    Création d'un utilisateur
                </Heading>
            </Flex>
            <Flex
                position={{ base: 'relative', lg: 'fixed' }}
                my={2}
                align={'center'}
                right={{ lg: '-8rem' }}
                mt={'3rem'}
                justify={'center'}
                w={'100%'}
            >
                <form>
                    <Flex
                        align={'center'}
                        flexDir={{ base: 'column', lg: 'row' }}
                        justify={'center'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={user.email}
                                name='email'
                                onChange={(e) => handleChange(e)}
                                type='email'
                                placeholder='Entrez votre email svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }} isRequired>
                            <FormLabel>Nom </FormLabel>
                            <Input
                                value={user.nom}
                                name='nom'
                                onChange={(e) => handleChange(e)}
                                type='text'
                                placeholder='Entrez votre nom svp!'
                            />
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }}>
                            <FormLabel>Prenom</FormLabel>
                            <Input
                                value={user.prenom}
                                name='prenom'
                                onChange={(e) => handleChange(e)}
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
                        <FormControl isRequired>
                            <FormLabel>Profil</FormLabel>
                            <Select
                                placeholder='Choisir votre profil'
                                value={user.profil}
                                name='profil'
                                onChange={(e) => handleChange(e)}
                            >
                                <option value={'admin'}>Admin</option>
                                <option value={'gerant'}>Gérant</option>
                                <option value={'gestionnaire'}>Gestionnaire</option>
                                <option value={'livreur'}>Livreur</option>
                            </Select>
                        </FormControl>
                        <FormControl ml={{ base: 0, lg: 2 }} isRequired>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                value={user.password}
                                name='password'
                                onChange={(e) => handleChange(e)}
                                type='password'
                                placeholder='Entrez votre mot de passe svp!'
                            />
                        </FormControl>
                    </Flex>
                    <Stack align={'center'} justify={'center'} >
                        <Button
                            onClick={() => addUser()}
                            _hover={{ bg: 'green.700' }}
                            bg={'green.600'}
                            borderRadius={5}
                            color={'white'}
                            border={'2px solide black'}
                            p={'0.5rem 2rem'}

                            mt={4}>
                            Créer utilisateur
                        </Button>
                    </Stack>
                </form>
            </Flex>
        </Flex>
    )
}