import React from 'react'
import {
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, Link, Flex, Text,
} from '@chakra-ui/react'
import AppLogo from '../AppLogo'
import { VscListFlat } from 'react-icons/vsc'
import { BsFillGrid3X3GapFill, BsGrid1X2Fill, BsHouse } from 'react-icons/bs'

export default function MobileNavMenu() {
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
                    <DrawerCloseButton />
                    <DrawerHeader >
                        <Flex justify={'center'} align={'center'}>
                            <AppLogo />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <Link href='/' _hover={{ textDecor: 'none' }}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'md'}
                                borderRadius={5}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent', textDecor: 'none' }}
                            >
                                <BsHouse />
                                <Text ml={2}>Accueil</Text>
                            </Flex>
                        </Link>
                        <Link href='/allProduitsClient' _hover={{ textDecor: 'none' }}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'md'}
                                borderRadius={5}
                                mt={4}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent', textDecor: 'none' }}
                            >
                                <BsGrid1X2Fill />
                                <Text ml={2}>Tous les médicaments</Text>
                            </Flex>
                        </Link>
                        <Link href='/categoriesProduitsClient' _hover={{ textDecor: 'none' }}>
                            <Flex
                                align={'center'}
                                fontSize={22}
                                flexDir={'row'}
                                boxShadow={'md'}
                                borderRadius={5}
                                mt={4}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent', textDecor: 'none' }}
                            >
                                <BsFillGrid3X3GapFill />
                                <Text ml={2}>Catégories</Text>
                            </Flex>
                        </Link>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant={'outline'} mr={3} onClick={onClose}>
                            Fermer
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}