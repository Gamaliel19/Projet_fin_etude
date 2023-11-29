import { Box, Text, Flex, Heading, Button, Link} from "@chakra-ui/react";
import React from "react";
import Image from '../images/image1.png'

export default function HomePage() {
    return (
        <Flex
            gap={2}
            flexDirection={{ base: "column", lg: "row" }}
            w={{ base: "100%", lg: "90%" }}
            mx={'auto'}
            p={'2rem'}
        >
            <Box w={{ base: '100%', lg: '50%' }}>
                <Heading
                    size={{ base: "xl", lg: "3xl" }}
                    lineHeight={'4rem'}
                    color={'blue.400'}
                >
                    Votre pharmacie en ligne<br /><Text as={'span'} color={'teal'}>EDNE</Text>
                </Heading>
                <Text
                    fontSize={{ baes: "md", lg: "lg" }}
                    py={'1rem'}
                    maxW={'600px'}
                >
                    Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Sit nostrum rerum nobis quas, est molestias qui omnis
                    uscipit quaerat. Libero illo quis eligendi doloremque modi vitae aperiam ab amet consequatur!
                </Text>
                <Link href="/produits">
                    <Button
                        minW={'10rem'}
                        colorScheme='teal'
                        variant='solid'>
                        Voir plus
                    </Button>

                </Link>
            </Box>
            <Box w={{ base: '100%', lg: '50%' }}>
                <Box
                    mx={'3rem'}
                    w={{ base: '357px', lg: '540px' }}
                    h={{ base: '300px', lg: '500px' }}
                    backgroundImage={Image}
                    backgroundSize={'cover'}
                    backgroundRepeat={'no-repeat'}
                    backgroundPosition={'center'}
                />
            </Box>
        </Flex>
    )
}