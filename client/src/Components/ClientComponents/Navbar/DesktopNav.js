import React from 'react'
import {
    Box, Button, Flex, Link, Stack,  useColorModeValue
} from '@chakra-ui/react'
import { FaShoppingBag } from "react-icons/fa"
import AppLogo from '../AppLogo'
import { Search } from '../Recherche/Recherche'
import ColorModeToggle from '../../ColorModeToggle'
//import { PanierContext } from '../../../AppContext/PanierContext'

export default function DesktopNav({ size }) {
    //const { items } = useContext(PanierContext)

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
                <Flex w={{ base: '100%', lg: '50%' }}>
                    <Link href='/panierClient'>
                        <Button bg={'transparent'} fontSize={20}>
                            <FaShoppingBag fontSize={26} color={useColorModeValue('black', 'white')} />
                            <Flex
                                bg={useColorModeValue('white', 'gray.700')}
                                justify={'center'}
                                align={'center'}
                                m={2}
                                borderRadius={'200%'}
                                mb={5}
                                ml={'-2'}
                                color={'red'}
                            >
                                {size}
                            </Flex>
                        </Button>
                    </Link>
                </Flex>
                <ColorModeToggle />
            </Stack>
        </Flex>
    )
}