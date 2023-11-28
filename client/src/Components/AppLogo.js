import React from "react";
import {Text,Link } from '@chakra-ui/react'

export default function AppLogo() {
    return (

        <Link href="/">
            <Text color={'gray.800'} fontWeight={'bold'}>
                Pharmacie
                <Text as={'span'} color={'green'}>Edene</Text>
            </Text>
        </Link>
    )
}