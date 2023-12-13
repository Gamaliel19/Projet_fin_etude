import React from 'react'
import {
    Box,
    Container,
    IconButton,
    Input,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react'
import AppLogo from '../ClientComponents/AppLogo';
import { FaFacebook, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const SocialButton = ({ children, label }) => {
    return (
        <chakra.button
            bg={'blackAlpha.100'}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as='a'
            href='href'
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: 'blackAlpha.200'
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.600')} color={'gray.700'} boxShadow={'lg'} borderRadius={5}>
            <Container align={'center'} as={Stack} maxW={'6xl'} py={10} >
                <SimpleGrid>
                    <Stack spacing={6}>
                        <Box>
                            <Text color={'dark'} fontSize={25} fontWeight={'bold'}>
                                Pharmacie
                                <Text as={'span'} color={'green'}>Edene</Text>
                            </Text>
                        </Box>
                        <Text fontSize={'sm'}>¢ 2023 Edene Pharmacie. Tous droits réservés.</Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label="Twitter" href={""}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label="Facebook" href={""}>
                                <FaFacebook />
                            </SocialButton>
                            <SocialButton label="Whatsapp" href={""}>
                                <FaWhatsapp />
                            </SocialButton>
                            <SocialButton label='Github' href={"https://github.com/Gamaliel19"}>
                                <FaGithub />
                            </SocialButton>
                        </Stack>
                    </Stack>

                </SimpleGrid>
            </Container>
        </Box>
    )
}