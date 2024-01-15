import React from 'react'
import {
    Button, Flex, Link, Spacer, Stack, Text,
} from '@chakra-ui/react'
import { FaBell } from "react-icons/fa"
import ColorModeToggle from '../../ColorModeToggle'

export default function DesktopNav({ data }) {

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
            >

                <Flex w={{ base: '100%', lg: '50%' }}>
                    <Link href='../admin/notifications' borderRadius={5}>
                        <Button bg={'transparent'}>
                            <FaBell fontSize={20} />
                        </Button>
                    </Link>

                </Flex>
                <ColorModeToggle />
                <Flex>
                    <Button
                        onClick={data.logout}
                        colorScheme='green'
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