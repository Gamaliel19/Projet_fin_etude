import React from "react";
import { Text, Link, Heading } from '@chakra-ui/react'

export default function AppLogo() {
    return (

        <Link href="/" _hover={{ textDecor: 'none', transform: 'outline', _after: 'variant' }}>
            <Heading>
                <Text color={'dark'} fontSize={25} fontWeight={'bold'}>
                    Pharmacie
                    <Text as={'span'} color={'green'}>Edene</Text>
                </Text>
            </Heading>
        </Link>
    )
}