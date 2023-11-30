import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Image from '../../images/image1.png'

export default function Home() {
    return (
        <Flex
            align={'center'}
            justify={'center'}
            flexDirection={{ base: "column", lg: "row" }}
            w={{ base: "100%", lg: "90%" }}
            mx={'auto'}
            p={{base:'2rem',lg:"4rem"}}
            mt={{base:"0",lg:"-20"}}
        >
            <Box w={{ base: '100%', lg: '50%' }}>
                <Heading
                    mx={'3rem'}
                    size={{ base: "xl", lg: "3xl" }}
                    lineHeight={'4rem'}
                    color={'blue.400'}
                >
                    Votre pharmacie en ligne<br /><Text as={'span'} color={'teal'}>Edene</Text>
                </Heading>
                <Text
                mx={'3rem'}
                    fontSize={{ base: 'md', lg: 'lg' }}
                    py='1rem'
                    maxW='600px'
                >
                    La santé pour tous!
                </Text>
            </Box>
            <Box w={{ base: '100%', lg: '50%' }}>
                <Box
                    mx={'0.005rem'}
                    w={{ base: '300px', lg: '600px' }}
                    h={{ base: '300px', lg: '500px' }}
                    backgroundImage={Image}
                    backgroundSize={'cover'}
                    backgroundRepeat={'no-repeat'}
                />
            </Box>
        </Flex>
    )
}