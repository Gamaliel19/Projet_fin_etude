import {
    Box, Button, Flex, FormControl, FormLabel, Heading,
    Input, Stack, Textarea, useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import httpClient from '../../httpClient'


let id
function EditProduct() {
    id = useParams([]).id
    const flag = useRef(false)
    const [data, setData] = useState([])
    const Annuler = () => {
        window.location.href = '/admin/produits'
    }
    const editProduct = async (value) => {
        try {
            const resp = await httpClient.put('http://127.0.0.1:5000/updateProduct/' + id, { ...data })
            window.location.href = "../../admin/produits"
            if (value === "") {
                setData({
                    dosage: "",
                    nom_com: "",
                    description: "",
                    prix: "",
                    date_fab: "",
                    date_per: "",
                    qte_stock: "",
                    num_lot: "",
                })
            }
            console.log(resp.data)
        } catch (error) {

        }
    }
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/listSingleProduct/' + id)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Box h={'90vh'} mt={-10} bg={useColorModeValue('white', 'gray.700')} >
            <Flex
                flexDir={'column'}
                h={{ lg: '60vh' }}
                ml={{ lg: '20rem' }}
                justify={'center'}
                mr={{ lg: '5rem' }}
                mt={{ base: 20, lg: 10 }}
                boxShadow={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
            >
                <Stack
                    align={'center'}
                    justify={'center'}
                >
                    <Box>
                        <Heading mt={5} fontSize={25}>Modifier un produit</Heading>
                    </Box>
                </Stack>

                <Stack ml={5} mt={5} mr={'1rem'}>
                    <Flex my={{ base: 10, lg: 0 }} align={'center'} justify={'center'}>
                        <form>
                            <Flex
                                align={'center'}
                                justify={'center'}
                                flexDir={{ base: 'column', lg: 'row' }}
                            >
                                <FormControl>
                                    <FormLabel>Numero_Lot</FormLabel>
                                    <Input
                                        value={data.num_lot}
                                        name='num_lot'
                                        type='text'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                                <FormControl ml={{ base: 0, lg: 2 }}>
                                    <FormLabel>Nom commercial</FormLabel>
                                    <Input
                                        value={data.nom_com}
                                        name='nom_com'
                                        type='text'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                                <FormControl ml={{ base: 0, lg: 2 }}>
                                    <FormLabel>Dosage</FormLabel>
                                    <Input
                                        value={data.dosage}
                                        name='dosage'
                                        type='text'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                                <FormControl ml={{ base: 0, lg: 2 }}>
                                    <FormLabel>Quantité</FormLabel>
                                    <Input
                                        value={data.qte_stock}
                                        name='qte_stock'
                                        type='number'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Flex
                                align={'center'}
                                justify={'center'}
                                flexDir={{ base: 'column', lg: 'row' }}
                            >
                                <FormControl>
                                    <FormLabel>Date_Fab</FormLabel>
                                    <Input
                                        value={data.date_fab}
                                        name='date_fab'
                                        type='Date'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                                <FormControl ml={{ base: 0, lg: 2 }}>
                                    <FormLabel>Date_Exp</FormLabel>
                                    <Input
                                        value={data.date_per}
                                        name='date_per'
                                        type='Date'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                                <FormControl ml={{ base: 0, lg: 2 }}>
                                    <FormLabel>Prix</FormLabel>
                                    <Input
                                        value={data.prix}
                                        name='prix'
                                        type='number'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>

                            </Flex>
                            <Flex>
                                <FormControl ml={{ base: 0, lg: 1 }}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        value={data.description}
                                        name='description'
                                        type='text'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </FormControl>
                            </Flex>
                            <Stack align={'center'} justify={'center'} flexDir={'row'}>
                                <Button
                                    onClick={(e) => editProduct(e)}
                                    _hover={{ bg: 'green.700' }}
                                    bg={'green.600'}
                                    borderRadius={5}
                                    color={'white'}
                                    width={'50%'}
                                    mt={4}>
                                    Mettre à jour
                                </Button>
                                <Button
                                    onClick={(e) => Annuler(e)}
                                    _hover={{ bg: 'red.600' }}
                                    bg={'red.500'}
                                    borderRadius={5}
                                    color={'white'}
                                    width={'30%'}
                                    mt={4}>
                                    Annuler
                                </Button>
                            </Stack>
                        </form>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    )
}

export default EditProduct