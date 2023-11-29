import React from "react";
import { InputGroup, Input,Box, Tooltip, useColorModeValue } from '@chakra-ui/react'

export const Search = () => {
    return (
        <Box
        >
            <Tooltip hasArrow label='Rechercher votre produit!' bg='gray.300' color='black'>
                <InputGroup size={'sm'} w={{ base: '100%', lg: '32rem' }}
                    boxShadow={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'lg'}
                    p={3}
                >
                    <Input
                        type="text"
                        bg={'transparent'}
                        placeholder="Rechercher..."
                        focusBorderColor="green.400"
                        borderWidth={'2px'}
                        borderRadius={5}
                        borderColor={'gray.400'}
                    />
                </InputGroup>
            </Tooltip>
        </Box>
    )
}