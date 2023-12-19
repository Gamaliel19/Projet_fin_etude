import React from 'react'
import {
    Box, Button, Flex, Link, Stack, Text, useColorModeValue,
} from '@chakra-ui/react'
import { FaShoppingCart } from "react-icons/fa"
import AppLogo from '../AppLogo'
import { Search } from '../Recherche/Recherche'
import ColorModeToggle from '../../ColorModeToggle'
import NavbarUserEspace from './NavbarUserEspace'

export default function DesktopNav() {

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            px={'2rem'}
            py={'0.5rem'}
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

                <Flex w={{ base: '100%', lg: '50%' }} bg={useColorModeValue('transparent','gray.700')}>
                    <NavbarUserEspace />
                </Flex>
                <Flex w={{ base: '100%', lg: '50%' }}>
                    <Link href='/panierClient'>
                        <Button bg={'transparent'}>
                            <FaShoppingCart fontSize={26} />
                            <Text ml={2} fontSize={15} >Panier</Text>
                        </Button>
                    </Link>
                </Flex>
                <ColorModeToggle />
            </Stack>
        </Flex>
    )
}