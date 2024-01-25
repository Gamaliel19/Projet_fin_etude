import React from 'react'
import {
    Badge, Box, Button, Flex, Stack, Text
} from '@chakra-ui/react'
import { FaShoppingCart } from "react-icons/fa"
import AppLogo from '../AppLogo'
import { Search } from '../Recherche/Recherche'
import ColorModeToggle from '../../ColorModeToggle'

export default function DesktopNav({ size, setShow }) {

    return (
        <>
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
                    <Flex w={{ base: '100%', lg: '50%' }}>
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
                    </Flex>
                    <ColorModeToggle />
                </Stack>
            </Flex>
        </>
    )
}