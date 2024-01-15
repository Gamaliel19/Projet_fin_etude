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
import image2 from '../../../images/Comprime.jpg'
import ClientLayoutRoot from '../../../Layouts/ClientLayoutRoot';


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
        spaceBetween: -850,
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
        function updateTitle() {
            document.title = name;
        }
        updateTitle()
        fetch("http://127.0.0.1:5000/listProduct")
            .then(resp => resp.json())
            .then(data => setMedoc(data))
    }, [])
    //Titre ajout au panier
    const [name, setName] = useState('Ajout au panier')
    //l'état du panier
    const [cart, setCart] = useState([])
    //Alert si le produit est déjà dans le panier
    const [warning, setWarning] = useState(false)
    //Le toast 
    const toast = useToast()

    const handleClick = (item) => {
        console.log(item)
        let isPresent = false
        cart.forEach((product) => {
            if (item._id === product._id)
                isPresent = true
        })
        if (isPresent) {
            setWarning(true)
            setTimeout(() => {
                setWarning(false)
            }, 1000)
            return;
        }
        setCart([...cart, item])
    }

    return (
        <Box w={{ base: "100%", lg: "90%" }} mx={'auto'} p={'2rem'}>

            <SectionHeading title={title} />
            <Flex flexDir={{ base: 'column', lg: 'row' }} justify={'center'} align={'center'}>
                <Swiper  {...sliderSettings} style={{ width: "100%", height: "100%" }}>
                    {Object.values(medoc).map(item => {
                        return <SwiperSlide style={slideStyles} key={item.id}>
                            <Card w={{ base: 'xs', lg: 'xs' }} position={'relative'} m={'0.5rem'}>
                                <CardBody>
                                    <Image src={image2} alt={""} borderRadius='md' />
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
                                            onClick={() => handleClick(item)}
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
                            <Button borderColor='blue.400' bg={useColorModeValue('white', 'gray.700')} onClick={() => voirPlus()} variant='outline'>
                                voir plus
                            </Button>
                        </Flex>
                    </Flex>
                </Swiper>
            </Flex>
        </Box>
    )
}

export default SwiperListeProduits
