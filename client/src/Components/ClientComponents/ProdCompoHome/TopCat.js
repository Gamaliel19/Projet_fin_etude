import { Box, Card, Grid, GridItem, Image, Heading, CardBody, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import Img from '../../../images/Comprime3.jpg'

export default function TopCategories() {
    const [cat, setCat] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/listCat")
            .then(res => res.json())
            .then(data => setCat(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>


            <Box
                w={{ base: '100%', lg: '90%' }}
                mx={'auto'}
            >
                <SectionHeading title="Famille" />
                <Flex align={'center'} justify={'center'}>
                    <Grid templateColumns={{ base: 'repeat(1,fr)', md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }} >
                        {cat.map(item => {
                            for (let i = 0; i < 6; i++) {
                                return <GridItem
                                    mr={{ base: 3, lg: 2 }}
                                    mt={{ base: 2, lg: 0 }}
                                    dir="'row"
                                >

                                    <Card
                                        direction={'row'}
                                        align={'center'}
                                        overflow={'hidden'}
                                        variant={'outline'}
                                        bg={'transparent'}
                                        w={'100%'}
                                        h={'100%'}
                                        p={'10px'}
                                        _hover={{ cursor: 'pointer', bgColor: 'gray.400' }}
                                    >
                                        <Image src={Img} alt="" w={100} h={100} />
                                        <CardBody>
                                            <Heading size={{ base: 'sm', lg: 'md' }}>{item.nom}</Heading>
                                        </CardBody>
                                    </Card>

                                </GridItem>
                            }
                        })}
                    </Grid>

                </Flex>

            </Box>

        </>
    )
};

export const TopCategoriesCard = () => {


    return (
        <>

        </>
    )
}