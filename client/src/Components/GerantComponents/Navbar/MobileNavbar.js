import React, { useEffect, useState } from 'react'
import {
    Flex, Stack, Button, Link, Text, Badge
} from '@chakra-ui/react'
import MobileNavMenu from './MobileNavMenu'
import ColorModeToggle from '../../ColorModeToggle'
import { BsBell } from 'react-icons/bs'

export default function MobileNav({ data }) {
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/expired_products")
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [product])

    return (
        <>
            <Flex
                justify={'space-between'}
                align={'center'}
                px={'2rem'}
                py={'1rem'}
                borderBottomWidth={'1px'}
                borderColor={'gray.200'}
                display={{ base: "flex", lg: "none" }}
                bg={'blue.400'}
            >
                <Stack>
                    <MobileNavMenu data={data} />
                </Stack>
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
                <Stack direction={'row'} spacing={1}>
                    <Link >
                        <Button
                            onChange={() => { }}
                            borderRadius={'full'}
                            bg={'transparent'}
                            _hover={{ bg: 'blue.500' }}
                        >
                            <BsBell fontSize={30} color={'white'} />
                            <Badge
                                textAlign={'center'}
                                bg={'red'}
                                borderRadius="full"
                                mb={4}
                                fontSize={15}
                                color={'white'}
                                ml="-3"
                            >
                                {product.length}
                            </Badge>
                        </Button>
                    </Link>
                    <ColorModeToggle />
                </Stack >
            </Flex >
        </>
    )
}