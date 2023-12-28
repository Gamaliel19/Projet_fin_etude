import React, { useEffect, useState } from "react";
import { InputGroup, Input, Box, Tooltip, useColorModeValue, FormControl, InputLeftElement } from '@chakra-ui/react'
import httpClient from "../../../httpClient";
import { FaSearch } from "react-icons/fa";

export const Search = () => {

    const [nom_com, setNom_com] = useState([])

    const searchProduct = async () => {
        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/searchProduct", {
                nom_com
            })

        } catch (error) {
        }
    }
    useEffect(() => {
        searchProduct()
    }, [])
    return (
        <Box
        >
            <FormControl ml={{ base: 0, lg: 2 }}>
                <InputGroup
                    size={'sm'}
                    w={{ base: '100%', lg: '32rem' }}
                    boxShadow={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'lg'}
                    p={1}
                >
                    <InputLeftElement
                        margin={1}
                        onClick={() => searchProduct()}
                        children={<FaSearch />}
                        _hover={{ cursor: 'pointer' }}
                        bg={'gray.700'}
                        borderLeftRadius={5}
                        color={'white'}
                        focusBorderColor="gray.700"
                    />
                    <Input
                        type="text"
                        value={nom_com}
                        onChange={(e) => setNom_com(e.target.value)}
                        bg={'transparent'}
                        placeholder="Rechercher..."
                        focusBorderColor="green.400"
                        borderWidth={'2px'}
                        borderRadius={5}
                        borderColor={'gray.400'}
                    />
                </InputGroup>
            </FormControl>
        </Box>
    )
}