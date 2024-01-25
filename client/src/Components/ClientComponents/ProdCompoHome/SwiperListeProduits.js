import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules';
import {
    Alert,
    AlertIcon,
    Box, Button, Card, CardBody, Flex, Heading, Image, Stack, Text, useColorModeValue, useToast,
} from '@chakra-ui/react'
import SectionHeading from './SectionHeading'
import { SwiperNavButton } from './SwiperNavButton';
import AuthContext from '../../../store/authContext';


const slideStyles = {
    boxSizing: "border-box",
    maxWidth: "350%"
};

function SwiperListeProduits({ title }) {

    const voirPlus = () => {
        window.location.href = "/allProduitsClient"
    }
    const sliderSettings = {
        modules: [Navigation, Autoplay],
        spaceBetween: 100,
        slidesPerView: "auto",
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    };
    //fetching data
    const [medoc, setMedoc] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:5000/listProduct")
            .then(resp => resp.json())
            .then(data => setMedoc(data))
    }, [])

    const panierCtx = useContext(AuthContext)
    const addToCart = panierCtx.addToCart
    const items = panierCtx.items

    //Alert si le produit est déjà dans le panier
    const warning = panierCtx.warning
    //Pour afficher le contenu du panier
    const show = panierCtx.show

    return (

        <>
            {
                !show ? <Box w={{ base: "100%", lg: "90%" }} mx={'auto'} p={'2rem'}>

                        <SectionHeading title={title} />
                        <Flex flexDir={{ base: 'column', lg: 'row' }} justify={'center'} align={'center'}>
                            <Swiper  {...sliderSettings} style={{ width: "100%", height: "100%" }}>
                                {Object.values(medoc).map(item => {
                                    return <SwiperSlide style={slideStyles} key={item.id}>
                                        <Card w={{ base: 'xs', lg: 'xs' }} position={'relative'} m={'0.5rem'}>
                                            <CardBody>
                                                <Image src={item.image} alt={""} borderRadius='md' />
                                                <Stack mt='6' spacing='2'>
                                                    <Flex justify={'space-between'} align={'center'} >
                                                        <Heading size='md'>{item.nom_com}</Heading>
                                                        <Flex color={'blue.400'} fontWeight={'bold'}>
                                                            <Text fontSize={'lg'}>{item.prix}</Text>
                                                            <Text fontSize={'sm'} ml={2}>FCFA</Text>
                                                        </Flex>
                                                    </Flex>
                                                    <Text>{item.description}</Text>
                                                    <Button
                                                        variant={'outline'}
                                                        borderColor={'blue.400'}
                                                        color={'blue.400'}
                                                        rounded={'full'}
                                                        size={'sm'}
                                                        w={'150px'}
                                                        onClick={() => addToCart(item)}
                                                    >
                                                        Ajouter au panier
                                                    </Button>
                                                    {
                                                        //<AddToCardButton product={item}/>
                                                    }
                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    </SwiperSlide>
                                })}
                                {
                                    warning && <Stack> <Alert status='error'><AlertIcon />Le produit a déjà été ajouté au panier.</Alert></Stack>
                                }
                                <Flex align={'center'} flexDir={'row'}>
                                    <SwiperNavButton />
                                    <Flex>
                                        <Button borderColor='blue.400' bg={'white'} onClick={() => voirPlus()} variant='outline'>
                                            voir plus
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Swiper>
                        </Flex>
                    </Box>
                    :
                    <Box w={{ base: "100%", lg: "90%" }} mx={'auto'} p={'2rem'}>
                        {
                            items.map(item => {
                                return <Flex>
                                    <Text>{item.nom_comm}</Text>
                                </Flex>
                            })
                        }
                    </Box>

            }

        </>
    )
}

export default SwiperListeProduits
