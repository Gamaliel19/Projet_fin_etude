import React, { useEffect, useState } from 'react'
import { Card, CardBody, Container, Flex, Heading, IconButton, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaBackspace, FaBackward, FaEdit, FaTrash } from 'react-icons/fa'


let id

export const SingleAdminProduct = () => {
    id = useParams().id
    const [product, setProduct] = useState([])
    const Annuler = () => {
        window.location.href = '/admin/produits'
    }

    useEffect(() => {
        axios.get('http://localhost:5000/listSingleProduct/' + id)
            .then(res => {
                console.log(res.data)
                setProduct(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(product)

    return (
        <>
            <IconButton
            onClick={()=> Annuler()}
                bg={'transparent'}
                _hover={{bg:'blue.700', color:'white'}}
                left={{ base: '1.5rem', lg: '16rem}' }}
                m={'0.5rem 2rem'}
                icon={<FaArrowLeft/>}
            />
            <Flex
                flexDir={{ base: 'column', lg: 'row' }}
                w={{ base: '100%', lg: '60%', xl: '60%' }}
                ml={{ base: '', lg: '30%', xl: '30%' }}
                mt={'10%'}
                justify={'space-between'}
                align={'center'}
            >
                {/* Section pour le card(l'image du produit. si y en a) */}
                <Flex align={'center'} justify={'center'}>
                    <Card
                        w={{ base: 'xs', lg: 'xs' }}
                        h={'20rem'}
                        position={'relative'}
                        m={'0.5rem'}
                    >
                        <CardBody>
                            <Image
                                src={product.image}
                                alt={"Image du produit"}
                                borderRadius='md'
                            />
                        </CardBody>
                    </Card>
                </Flex>
                <Flex
                    align={'flex-start'}
                    justify={'center'}
                    flexDir={'column'}
                    boxShadow={'md'}
                    borderRadius={5}
                    w={{ base: 'xs', lg: 'md' }}
                    h={'20rem'}
                    p={'0rem 2rem'}
                >
                    <Stack>
                        <Heading size='md'>Designation: {product.nom_com}</Heading>
                        <Text fontSize={'lg'}>Prix: {product.prix}FCFA</Text>
                        <Text fontSize={'lg'}>Quantité en stock: {product.qte_stock}</Text>
                        <Text>Description: {product.description}</Text>
                    </Stack>
                    <Stack
                        flexDir={'row'}
                        align={'flex-end'}
                    >
                        <Link to={`/admin/editProduct/${id}`}>
                            <IconButton
                                icon={<FaEdit />}
                                color={'green'}
                            />
                        </Link>
                        <IconButton
                            ml={2}
                            icon={<FaTrash color={'red'} />}
                            onClick={e => deleteProduct(id)}
                        />
                    </Stack>
                </Flex>
            </Flex>

        </>
    )
    function deleteProduct(id) {
        const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer ce produit?")
        if (conf) {
            axios.delete('http://localhost:5000/deleteProduct/' + id)
                .then(res => {
                    alert('Ce produit a été supprimé avec succès!')
                    window.location.href = '/admin/produits'
                }).catch(err => console.log(err))
        }
    }
}
