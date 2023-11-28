import React from 'react'
import { Box } from '@chakra-ui/react'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Navbar() {
    return (
        <Box className='navbar-wrapper' h={'120px'}>
            <Box
                position={'fixed'}
                w={'100%'}
                bgColor={'white'}
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