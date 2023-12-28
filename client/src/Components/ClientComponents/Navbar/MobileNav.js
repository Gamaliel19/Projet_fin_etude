import React from 'react'
import {
    Box, Flex, Stack, Button, Link, Text, useColorModeValue, Tooltip, Heading,
} from '@chakra-ui/react'
import { Search } from '../Recherche/Recherche'
import { FaShoppingCart } from 'react-icons/fa'
import MobileNavMenu from './MobileNavMenu'
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
                <Stack ml={5} align={'center'} justify={'center'} w={300} borderRadius={5}>
                    <Link href='/' _hover={{ textDecor: 'none', transform: 'outline', _after: 'variant' }}>
                        <Heading bg={'transparent'}>
                            <Text color={'dark'} fontSize={25} fontWeight={'bold'}>Ph
                                <Text as={'span'} color={'green'}>Edene</Text>
                            </Text>
                        </Heading>
                    </Link>
                </Stack>
                <Stack direction={'row'} spacing={1}>
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