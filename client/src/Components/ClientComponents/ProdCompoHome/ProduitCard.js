import React, { useEffect, useState } from 'react'
import { Card, Image, Stack, Text, CardBody, Heading, Flex, Box } from '@chakra-ui/react'
import { AddToCardButton } from './AddToCardButton '
import image2 from '../../../images/Comprime.jpg'


export const ProduitsCard = () => {
    //fetching data
    const [medoc, setMedoc] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/listProduct")
            .then(resp => resp.json())
            .then(data => setMedoc(data))
    }, [])

    return (
        <Box flexDirection={'row'}>
            {Object.values(medoc).map(item => {
                return <Card w={{ base: 'xs', lg: 'sm' }} position={'relative'} m={'0.5rem'}>
                    <CardBody>
                        <Image src={image2} alt={""} borderRadius='sm' />
                        <Stack mt='6' spacing='2'>
                            <Flex justify={'space-between'} align={'center'} >
                                <Heading size='md'>{item.nom_com}</Heading>
                                <Flex color={'blue.400'} fontWeight={'bold'}>
                                    <Text fontSize={'lg'}>{item.prix}</Text>
                                    <Text fontSize={'sm'} ml={2}>FCFA</Text>
                                </Flex>
                            </Flex>
                            <Text>{item.description}</Text>
                            <AddToCardButton />
                        </Stack>
                    </CardBody>
                </Card>
            })}
        </Box>
    )
}


