import React, { useState, useEffect } from 'react'
import { Box, Card, CardBody, Flex, Grid, GridItem, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { AddToCardButton } from '../../Components/ClientComponents/ProdCompoHome/AddToCardButton '
import image2 from '../../images/Comprime.jpg'

function AllProduits() {
  const [medoc, setMedoc] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/listProduct")
      .then(res => res.json())
      .then(data => setMedoc(data))
  }, [])

  return (
    <Flex
      minHeight={'100vh'}
      bg={useColorModeValue('white', 'gray.700')}
      mt={{ base: "15", lg: "-20" }}
      mx={'auto'}
      p={{ base: '2rem', lg: "4rem" }}
    >
      <Box w={{ base: '100%', lg: '90%' }}>
        <Stack mb={5}>
          <Heading>Tous les médicaments</Heading>
        </Stack>
        <Grid templateColumns={{ base: 'repeat(1,fr)', md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }}>
          {Object.values(medoc).map(item => {
            return <GridItem mr={{ base: 0, lg: 0 }} mt={{ base: 2, lg: 0 }}>
              <Card
                w='xs'
                position={'relative'}
                direction={'row'}
                align={'center'}
                variant={'outline'}
                bg={'transparent'}
                m='0.1rem'
                flexDir={'row'}
              >
                <CardBody>
                  <Image src={image2} alt={""} borderRadius='lg' />
                  <Stack mt='6' spacing='2'>
                    <Flex justify={'space-between'} align={'center'} >
                      <Heading size='md'>{item.nom_com}</Heading>
                      <Flex color={'blue.400'} fontWeight={'bold'}>
                        <Text fontSize={'lg'}>{item.prix}</Text>
                        <Text fontSize={'sm'} ml={2}>FCFA</Text>
                      </Flex>
                    </Flex>
                    <Text>{item.description}</Text>
                    <AddToCardButton product={item} />
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          })}
        </Grid>
      </Box>
    </Flex>
  )
}

export default AllProduits
