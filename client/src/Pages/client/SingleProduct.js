import { Box, Text, Flex, Heading, Card, CardBody, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Image from '../../images/image4.png'
import { useParams } from "react-router-dom";
import axios from "axios";
import { AddToCardButton } from "../../Components/ClientComponents/ProdCompoHome/AddToCardButton ";

let id

function SingleProduct() {
    const flag = useRef(false)
    id = useParams().id
    const [data, setData] = useState([])

    useEffect(() => {
        if (flag.current === false) {
            axios.get('http://localhost:5000/listSingleProduct/' + id)
                .then(res => {
                    console.log(res.data.description)
                    setData(res.data)
                })
                .catch(err => console.log(err))
        }
        return () => flag.current = true
    }, [])

    return (
        <Flex
            flexDirection={{ base: "column", lg: "row" }}
            w={{ base: "100%", lg: "90%" }}
            mx={'auto'}
            p={{ base: '2rem', lg: "4rem" }}
            mt={{ base: "0", lg: "-20" }}
        >
            <Flex
                w={{ base: '100%', lg: '50%' }}
                justify={{ base: 'center' }}
                align={{ base: 'center' }}
            >
                <Box
                    mx={'0.005rem'}
                    w={{ base: '500px', lg: '600px' }}
                    h={{ base: '300px', lg: '400px' }}
                    backgroundImage={Image}
                    backgroundSize={'cover'}
                    backgroundRepeat={'no-repeat'}
                />
            </Flex>
            <Box w={{ base: '100%', lg: '50%' }}>
                <Card w={{ base: '100%', lg: '100%' }} position={'relative'} m={'0.5rem'}>
                    <CardBody>
                        <Stack spacing='4'>
                            <Heading
                                color={'blue.400'}
                                size={{ base: "sm", lg: "lg" }}
                            >
                                {data.nom_com}
                            </Heading>
                            <Text>{data.description}</Text>
                            <Flex justify={'space-between'} align={'center'} >
                                <AddToCardButton product={data} />
                                <Flex color={'blue.400'} fontWeight={'bold'}>
                                    <Text fontSize={'lg'}>{data.prix}</Text>
                                    <Text fontSize={'sm'} ml={2}>FCFA</Text>
                                </Flex>

                            </Flex>
                        </Stack>
                    </CardBody>
                </Card>
            </Box>
        </Flex>
    )
}

export default SingleProduct