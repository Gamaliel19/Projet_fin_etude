import { Box, Card, Grid, GridItem, Image, Heading, CardBody } from "@chakra-ui/react";
import React from "react";
import SectionHeading from "./SectionHeading";
import Img from '../../../images/Comprime3.jpg'

export default function TopCategories() {
    return (
        <Box w={{ base: '100%', lg: '90%' }} mx={'auto'} py={'3rem'} px={'2rem'}>
            <SectionHeading title="Famille" />

            <Grid templateColumns={{ base: 'repeat(1,fr)', md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }}>
                <GridItem>
                    <TopCategoriesCard />
                </GridItem>
                <GridItem>
                    <TopCategoriesCard />
                </GridItem>
                <GridItem>
                    <TopCategoriesCard />
                </GridItem>
                <GridItem>
                    <TopCategoriesCard />
                </GridItem>
            </Grid>
        </Box>
    )
};

export const TopCategoriesCard = () => {
    return (
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
                <Heading size={{ base: 'sm', lg: 'md' }}>Antibiotique</Heading>
            </CardBody>
        </Card>
    )
}