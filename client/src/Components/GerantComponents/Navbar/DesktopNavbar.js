import React, { useEffect, useState } from 'react'
import { Badge, Button, Flex, Link, Spacer, Stack, Text, } from '@chakra-ui/react'
import ColorModeToggle from '../../ColorModeToggle'
import { BsBell } from 'react-icons/bs'

export default function DesktopNav({ data }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/expired_products")
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [product])

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

                <Flex w={{ base: '100%', lg: '50%' }}>
                    <Link href='../gerant/notifications'>
                        <Button
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

                </Flex>
                <ColorModeToggle />
                <Flex>
                    <Button
                        onClick={data.logout}
                        color={'white'}
                        colorScheme='white'
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