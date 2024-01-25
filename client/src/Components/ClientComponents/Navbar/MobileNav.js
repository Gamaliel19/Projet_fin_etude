import React from 'react'
import {
    Box, Flex, Stack, Button, Link, Text, Heading, Badge,
} from '@chakra-ui/react'
import { Search } from '../Recherche/Recherche'
import { FaShoppingCart } from 'react-icons/fa'
import MobileNavMenu from './MobileNavMenu'
import ColorModeToggle from '../../ColorModeToggle'

export default function MobileNav({ size, setShow }) {

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
                <Stack direction={'row'} spacing={-3}>
                    <Link>
                        <Button
                            onChange={() => setShow(false)}
                            borderRadius={'full'}
                            bg={'transparent'}
                            _hover={{ bg: 'gray.500', color: 'white' }}
                        >
                            <FaShoppingCart fontSize={25} />
                            <Badge
                                textAlign={'center'}
                                bg={'red'}
                                borderRadius="full"
                                mb={4}
                                fontSize={15}
                                color={'white'}
                                ml="-2.5"
                            >
                                {size}
                            </Badge>
                        </Button>
                    </Link>
                    <ColorModeToggle />
                </Stack >
            </Flex >
            <Box
                px={'3rem'}
                py={'0.1rem'}
                mb={'1rem'}
                display={{ base: "block", lg: "none" }}
            >
                <Search />
            </Box>
        </>
    )
}