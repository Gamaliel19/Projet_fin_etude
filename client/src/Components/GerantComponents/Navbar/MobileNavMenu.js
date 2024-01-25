import React from 'react'
import {
    Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure,
    Button, Text, Flex, Divider, Avatar, Heading, Link, DrawerHeader
} from '@chakra-ui/react'
import { VscListFlat } from 'react-icons/vsc'
import {
    BsBell, BsFillArchiveFill, BsFillGearFill, BsShop
} from 'react-icons/bs'
import avatar from '../Dashboard/avatar.jpg'

export default function MobileNavMenu({ navSize, data }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} onClick={onOpen} bg={'blue.400'} color={'white'}>
                <VscListFlat fontSize={25} />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader bg={'blue.400'}>
                        <Flex mt={2} align={"center"} justify={'center'}>
                            <Avatar size={"md"} src={avatar} />
                            <Flex flexDir={"column"} ml={4} display={navSize === "small" ? "none" : "flex"} >
                                <Heading as={"h3"} size={"sm"} textColor={'white'}>{data.userEmail}</Heading>
                                <Text>{data.userProfil}</Text>
                            </Flex>
                        </Flex>

                    </DrawerHeader>
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <DrawerCloseButton />
                    <DrawerBody bg={'gray.100'}>
                        <Link href='/gerant' _hover={{textDecor:'none'}}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                borderRadius={'0.5rem'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsShop />
                                <Text ml={2}>Ventes</Text>
                            </Flex>
                        </Link>
                        <Link href='../gerant/produits' _hover={{textDecor:'none'}}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                borderRadius={'0.5rem'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsFillArchiveFill />
                                <Text ml={2}>Médicaments</Text>
                            </Flex>
                        </Link>
                        <Link href='../gerant/notifications' _hover={{textDecor:'none'}}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                borderRadius={'0.5rem'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsBell />
                                <Text ml={2}>Notifications</Text>
                            </Flex>
                        </Link>
                        <Link href='../gerant/settings' _hover={{textDecor:'none'}}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                borderRadius={'0.5rem'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsFillGearFill />
                                <Text ml={2}>Paramètres</Text>
                            </Flex>
                        </Link>

                    </DrawerBody>
                    <DrawerFooter bg={'gray.100'}>
                        <Button
                            onClick={data.logout}
                            colorScheme='white'
                            variant='outline'
                            borderRadius={10}
                            p={'0.5rem 2rem'}
                        >
                            Déconnexion
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}