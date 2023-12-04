import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules';
import {
    Box,
} from '@chakra-ui/react'
import SectionHeading from './SectionHeading'
import { ProduitsCard } from './ProduitCard';
import { SwiperNavButton } from './SwiperNavButton';


const slideStyles= {
    boxSizing: "border-box",
    maxWidth: "350px"
};
function SwiperListeProduits({ title }) {

    const sliderSettings = {
        modules: [Navigation, Autoplay],
        spaceBetween: 10,
        slidesPerView: "auto",
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    };

    return (
        <Box w={{ base: "100%", lg: "90%" }} mx={'auto'} p={'2rem'}>
            <SectionHeading title={title} />
            <Swiper  {...sliderSettings} style={{width:"100%",height:"100%"}}>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>
                <SwiperSlide style={slideStyles}>
                    <ProduitsCard/>
                </SwiperSlide>

                <SwiperNavButton/>
            </Swiper>
        </Box>
    )
}

export default SwiperListeProduits
