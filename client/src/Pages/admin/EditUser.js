import React, { useEffect, useState } from 'react'
import httpClient from '../../httpClient'
import { useParams } from 'react-router-dom'
import { Box, Button, Flex, FormControl, FormLabel, Heading, IconButton, Input, Select, Spacer, Stack, useColorModeValue } from '@chakra-ui/react'
import axios from 'axios'
import { FaArrowLeft } from 'react-icons/fa'

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
        <>
            <IconButton
                onClick={() => Annuler()}
                bg={'transparent'}
                _hover={{ bg: 'blue.700', color: 'white' }}
                left={{ base: '1.5rem', lg: '16rem}' }}
                m={'0.5rem 2rem'}
                icon={<FaArrowLeft />}
            />
            <Box>
                <Flex
                    flexDir={'column'}
                    ml={{ lg: '22rem' }}
                    justify={'center'}
                    mr={{ lg: '7rem' }}
                >
                    <Stack
                        align={'center'}
                        justify={'center'}
                    >
                        <Box
                            align={'center'}
                            justify={'center'}
                            mt={10}
                        >
                            <Heading mt={5}
                                fontSize={25}>
                                Mise à jour  informations
                            </Heading>
                        </Box>
                    </Stack>

                    <Stack ml={5} mt={5} mr={'1rem'}>
                        <Flex
                            my={{ base: 10, lg: 0 }}
                            align={'center'}
                            justify={'center'}
                        >
                            <form>
                                <Flex
                                    align={'center'}
                                    justify={'center'}
                                    flexDir={{ base: 'column', lg: 'row' }}
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
                                </Flex>
                                <Flex
                                    align={'center'}
                                    justify={'center'}
                                    flexDir={{ base: 'column', lg: 'row' }}
                                >
                                    <FormControl >
                                        <FormLabel>Prenom</FormLabel>
                                        <Input
                                            value={user.prenom}
                                            name='prenom'
                                            onChange={(e) => handleChange(e)}
                                            type='text'
                                            placeholder='Entrez votre prenom svp!'
                                        />
                                    </FormControl>
                                    <FormControl ml={{ base: 0, lg: 2 }}>
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
                    </Stack>
                </Flex>
            </Box>
        </>

    )
}