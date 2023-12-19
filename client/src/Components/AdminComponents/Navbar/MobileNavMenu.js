import React from 'react'
import {
    Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button,
    Text, Flex, Divider, Avatar, Heading, Link
} from '@chakra-ui/react'
import { VscListFlat } from 'react-icons/vsc'
import {
    BsBell, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill,
    BsListCheck, BsMenuButtonWideFill, BsPeopleFill, BsShop
} from 'react-icons/bs'
import avatar from '../Dashboard/avatar.jpg'

export default function MobileNavMenu({ navSize }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} onClick={onOpen}>
                <VscListFlat />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerFooter>
                        <Flex
                            p={"5%"}
                            flexDir={"column"}
                            w={"100%"}
                            alignItems={navSize === "small" ? "center" : "flex-start"}
                            mb={4}
                        >
                            <Flex mt={4} align={"center"}>
                                <Avatar size={"md"} src={avatar} />
                                <Flex flexDir={"column"} ml={4} display={navSize === "small" ? "none" : "flex"} >
                                    <Heading as={"h3"} size={"sm"}>Nom de compte</Heading>
                                    <Text color={"gray"}>Type de profil</Text>
                                </Flex>
                            </Flex>
                        </Flex>

                    </DrawerFooter>
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <DrawerCloseButton />
                    <DrawerBody>

                        <Link href='/admin'>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsShop />
                                <Text ml={2}>Ventes</Text>
                            </Flex>
                        </Link>
                        <Link href='../admin/produits'>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsFillArchiveFill />
                                <Text ml={2}>Médicaments</Text>
                            </Flex>
                        </Link>
                        <Link href='../admin/notifications'>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsBell />
                                <Text ml={2}>Notifications</Text>
                            </Flex>
                        </Link>
                        <Link href='../admin/utilisateurs'>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsPeopleFill />
                                <Text ml={2}>Gestion des utilisateurs</Text>
                            </Flex>
                        </Link>
                        <Link href='../admin/settings'>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                <BsFillGearFill />
                                <Text ml={2}>Paramètres</Text>
                            </Flex>
                        </Link>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}