import React from 'react'
import { Card, Image, Stack, Text, CardBody, Heading, Flex } from '@chakra-ui/react'
import { AddToCardButton } from './AddToCardButton '
import image2 from '../../images/Comprime.jpg'


export const ProduitsCard = () => {
    return (
        <Card w='xs' position={'relative'} m={'0.5rem'}>
            <CardBody>
                <Image src={image2} alt={""} borderRadius='lg' />
                <Stack mt='6' spacing='2'>
                    <Flex justify={'space-between'} align={'center'}>
                        <Heading size='md'>Paracetamol</Heading>
                        <Flex color={'blue.400'} fontWeight={'bold'}>
                            <Text fontSize={'sm'}>FCFA</Text>
                            <Text fontSize={'lg'}>500</Text>
                        </Flex>
                    </Flex>

                    <Text>
                        Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit.
                    </Text>

                    <AddToCardButton />
                </Stack>
            </CardBody>
        </Card>
    )
}


