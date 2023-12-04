import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
    return (
        <Box  h={'120px'}>
            <Box
                position={'fixed'}
                bg={useColorModeValue('white', 'gray.700')}
                w={'100%'}
                mb={'1rem'}
                zIndex={10}
                fontWeight={'bold'}
            >
                <DesktopNav />
                <MobileNav />
            </Box>
        </Box>
    )
}