import React from 'react'
import {
    Box, Flex, Stack, Button, Link, Text, useColorModeValue, Tooltip,
} from '@chakra-ui/react'
import { Search } from '../Recherche/Recherche'
import { FaShoppingCart } from 'react-icons/fa'
import MobileNavMenu from './MobileNavMenu'
import NavbarUserEspace from './NavbarUserEspace'
import ColorModeToggle from '../../ColorModeToggle'

export default function MobileNav() {

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
            >
                <Box>
                    <MobileNavMenu />
                </Box>
                <Link href="/">
                    <Text color={'dark'} fontSize={25} fontWeight={'bold'}>Ph
                        <Text as={'span'} color={'green'}>Edene</Text>
                    </Text>
                </Link>
                <Stack direction={'row'} spacing={1}>

                    <Flex>
                        <NavbarUserEspace />
                    </Flex>
                    <Tooltip hasArrow label='Mon panier' bg='gray.300' color='black'>
                        <Link href='/panierClient'>
                            <Button bg={useColorModeValue('white', 'gray.700')}>
                                <FaShoppingCart fontSize={26} />
                            </Button>
                        </Link>
                    </Tooltip>
                    <ColorModeToggle />
                </Stack >
            </Flex >
            <Box
                px={'2rem'}
                py={'0.5rem'}
                mb={'1rem'}
                display={{ base: "block", lg: "none" }}
            >
                <Search />
            </Box>
        </>
    )
}