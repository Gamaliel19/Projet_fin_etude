import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Flex, Link, Spacer, Stack, Text } from '@chakra-ui/react'
import ColorModeToggle from '../../ColorModeToggle'
import { BsBell } from 'react-icons/bs'
import AuthContext from '../../../store/authContext'


export default function DesktopNav({ data }) {
    const [product, setProduct] = useState([])
    const productCtx = useContext(AuthContext)

    useEffect(() => {
        fetch("http://localhost:5000/expired_products", {
            method: "GET",
            headers: {
                "Context-Type": "application/json",
                Authorization: `Bearer ${productCtx.token}`
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [product])
    //console.log(product.length)

    return (
        <Flex
            boxShadow={'6px 4px 8px 2px'}
            align={'center'}
            px={'2rem'}
            py={'0.5rem'}
            display={{ base: "none", lg: "flex" }}
            bg={'blue.400'}
        >
            <Stack
                justify={'center'}
                align={'center'}
                direction={'row'}
                ml={3}
            >
                <Text color={'White'} fontSize={25} fontWeight={'gras'}>
                    Logo
                    <Text as={'span'} color={'green'}>Ph</Text>
                </Text>
            </Stack>
            <Spacer />
            <Stack direction={'row'} >
                <Link borderRadius={5} href='/admin/notifications'>
                    <Button
                        onChange={() => { }}
                        borderRadius={'full'}
                        bg={'transparent'}
                        _hover={{ bg: 'blue.500' }}
                    >
                        <BsBell fontSize={25} color={'white'} />
                        <Badge
                            textAlign={'center'}
                            bg={'red'}
                            borderRadius="full"
                            mb={4}
                            fontSize={15}
                            color={'white'}
                            ml="-2.5"
                        >
                            {product.length}
                        </Badge>
                    </Button>
                </Link>
                <ColorModeToggle />

                <Flex>
                    <Button
                        onClick={data.logout}
                        color={'white'}
                        colorScheme='white'
                        _hover={{ bg: 'blue.500' }}
                        variant='outline'
                        borderRadius={10}
                        p={'0.5rem 2rem'}
                    >
                        Déconnexion
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}