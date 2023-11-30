import React from "react";
import {Text,Link, useColorModeValue } from '@chakra-ui/react'

export default function AppLogo() {
    return (

        <Link href="/">
            <Text  color={'dark'} fontSize={25} fontWeight={'bold'}>
                Pharmacie
                <Text as={'span'} color={'green'}>Edene</Text>
            </Text>
        </Link>
    )
}