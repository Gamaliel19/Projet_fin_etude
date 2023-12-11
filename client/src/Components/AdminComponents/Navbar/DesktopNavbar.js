import React from 'react'
import {
    Box,
    Button,
    Flex,
    Link,
    Spacer,
    Stack,
    Text,
} from '@chakra-ui/react'
import { FaBell } from "react-icons/fa"
import { Search } from '../Recherche/Recherche'
import ColorModeToggle from '../../ColorModeToggle'

export default function DesktopNav() {

    const logout = async () => {
        window.location.href = "/loginAdmin"
    }

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            px={'2rem'}
            py={'1rem'}
            borderBottomWidth={'1px'}
            borderColor={'gray.200'}
            display={{ base: "none", lg: "flex" }}
        >
            <Stack justify={'center'} align={'center'} direction={'row'}>
                <Text color={'dark'} fontSize={25} fontWeight={'bold'}>
                    Pharmacie
                    <Text as={'span'} color={'green'}>Edene</Text>
                </Text>

            </Stack>
            <Spacer />
            <Stack
                direction={'row'}
                gap={6}
                flex={1}
                alignItems={'center'}
                justify={'center'}
            >
                <Box>
                    <Search />
                </Box>
            </Stack>
            <Spacer />
            <Stack
                direction={'row'}
            >

                <Flex w={{ base: '100%', lg: '50%' }}>
                    <Link href='../admin/notifications'>
                        <Button bg={'transparent'}>
                            <FaBell fontSize={20} />
                        </Button>
                    </Link>

                </Flex>
                <ColorModeToggle />
                <Flex>
                    <Button onClick={() => logout()} colorScheme='teal' variant='outline'>
                        Logout
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}