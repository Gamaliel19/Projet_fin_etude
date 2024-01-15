import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import DesktopNav from './DesktopNavbar'
import MobileNav from './MobileNavbar'

export default function Navbar({ data }) {
    return (
        <Box h={'75px'}>
            <Box
                position={'fixed'}
                bg={useColorModeValue('white', 'gray.700')}
                w={'100%'}
                mb={'1rem'}
                zIndex={10}
                fontWeight={'bold'}
            >
                <DesktopNav data={data} />
                <MobileNav data={data}/>
            </Box>
        </Box>
    )
}