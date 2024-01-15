import React, { useEffect, useState } from 'react'
import httpClient from '../../httpClient'
import { useParams } from 'react-router-dom'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Spacer, Stack, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'

let id

export default function EditUser() {
    id = useParams().id
    const [user, setUser] = useState({
        email: "",
        nom: "",
        prenom: "",
        profil: "",
        password: ""
    })
    const editUser = async (value) => {
        try {
            const resp = await httpClient.put('http://127.0.0.1:5000/updateUser/' + id, { ...user })
            window.location.href = "../../admin/utilisateurs"
            if (value === "") {
                setUser({
                    email: "",
                    nom: "",
                    prenom: "",
                    profil: "",
                    password: ""
                })
            }
            console.log(resp.data)
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const Annuler = () => {
        window.location.href = '/admin/utilisateurs'
    }

    useEffect(() => {
        axios.get('http://localhost:5000/listSingleUser/' + id)
            .then(res => {
                console.log(res.data)
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Box 
        //bg={useColorModeValue('white', 'gray.700')}
        >
            <Flex
                flexDir={'column'}
                boxShadow={'lg'}
                align={'center'}
                h={{ bse: '70vh', lg: '90vh' }}
                ml={{ lg: '20rem' }}
                mr={{ lg: '5rem' }}
                m={'5rem'}
            //bg={useColorModeValue('white', 'gray.700')}
            >
                <Flex
                    mt={{ base: 3, lg: 10 }}
                    justify={'center'}
                    align={'center'}
                    mb={{ base: 0, lg: 5 }}
                >
                    <Heading fontSize={25}
                    >Mettre à jour les informations d'un utilisateur
                    </Heading>
                </Flex>

                <Flex my={{ base: 5, lg: 0 }} >
                    <form>
                        <Flex
                            align={'center'}
                            flexDir={{ base: 'column', lg: 'row' }}
                            justify={'center'}
                        >
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={user.email}
                                    name='email'
                                    onChange={(e) => handleChange(e)}
                                    type='email'
                                    placeholder='Entrez votre email svp!'
                                />
                            </FormControl>
                            <FormControl ml={{ base: 0, lg: 2 }} >
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
                            <FormControl>
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
                            <FormControl ml={{ base: 0, lg: 2 }}>
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
                        <Spacer />
                        <Stack align={'center'} justify={'center'} flexDir={'row'}>
                            <Button
                                onClick={(e) => editUser(e)}
                                _hover={{ bg: 'green.700' }}
                                bg={'green.600'}
                                borderRadius={5}
                                color={'white'}
                                p={'0.5rem 2rem'}
                                mt={4}>
                                Mettre à jour
                            </Button>
                            <Button
                                onClick={(e) => Annuler(e)}
                                _hover={{ bg: 'red.600' }}
                                bg={'red.500'}
                                borderRadius={5}
                                color={'white'}
                                p={'0.5rem'}
                                mt={4}>
                                Annuler
                            </Button>
                        </Stack>
                    </form>
                </Flex>
            </Flex>
        </Box>
    )
}