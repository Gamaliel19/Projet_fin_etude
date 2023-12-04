import React from 'react'
import { Box, IconButton, useColorModeValue,  } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSwiper } from 'swiper/react'


export const SwiperNavButton = () => {
    const swiper = useSwiper();
    return (
        <Box m={'1.5rem'}>
            <IconButton
                rounded='lg'
                borderColor='blue.400'
                borderWidth='1px'
                color='brand.primar<Dark'
                bg={useColorModeValue('white', 'gray.700')}
                icon={<FaChevronLeft />}
                aria-label='Prec'
                onClick={() => swiper.slidePrev()}
                mx={1}
            />

            <IconButton
                rounded='lg'
                borderColor='blue.400'
                borderWidth='1px'
                color='brand.primar<Dark'
                bg={useColorModeValue('white', 'gray.700')}
                icon={<FaChevronRight />}
                aria-label='Suiv'
                onClick={() => swiper.slideNext()}
                mx={1}
            />
        </Box>
    )
}


