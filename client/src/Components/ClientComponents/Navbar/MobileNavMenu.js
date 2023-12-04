import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Link,
    Box,
} from '@chakra-ui/react'
import AppLogo from '../AppLogo'
import { VscListFlat } from 'react-icons/vsc'

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
                    <DrawerHeader>
                        <AppLogo />
                    </DrawerHeader>
                    <DrawerBody>
                        <Link>
                            <Box
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                Tous les médicaments
                            </Box>
                        </Link>
                        <Link>
                            <Box
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                Produits cosmétiques
                            </Box>
                        </Link>
                        <Link>
                            <Box
                                boxShadow={'lg'}
                                p={'0.5rem'}
                                _hover={{ cursor: 'pointer', bgColor: 'transparent' }}
                            >
                                Produits
                            </Box>
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