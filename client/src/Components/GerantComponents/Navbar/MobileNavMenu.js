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
                    <DrawerHeader>
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
                                    <Heading as={"h3"} size={"sm"}>{data.userNom}</Heading>
                                    <Text color={"gray"}>{data.userProfil}</Text>
                                </Flex>
                            </Flex>
                        </Flex>

                    </DrawerHeader>
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Link href='/gerant'>
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
                        <Link href='../gerant/produits'>
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
                        <Link href='../gerant/notifications'>
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
                        <Link href='../gerant/settings'>
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
                    <DrawerFooter>
                        <Button
                            onClick={data.logout}
                            colorScheme='green'
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