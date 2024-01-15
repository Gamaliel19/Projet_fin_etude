import React, { useEffect, useState } from "react";
import {
    InputGroup, Input, useColorModeValue, InputLeftElement,
    Box, Tr, Td, Table, Tbody, Flex, TableContainer
} from '@chakra-ui/react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

export const Search = () => {

    const [data, setData] = useState([])
    const [filterProduct, setFilterProduct] = useState([])

    const handleFilter = (value) => {
        const res = filterProduct.filter(f => f.nom_com.toLowerCase().includes(value))
        setData(res);
        if (value === "") {
            setData([])
        }

    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/listProduct')
            .then(res => res.json())
            .then(data => {
                setFilterProduct(data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <Box >
            <InputGroup
                size={'sm'}
                w={{ base: '100%', lg: '32rem' }}
                boxShadow={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={5}
                p={1}
            >
                <InputLeftElement
                    margin={1}
                    children={<FaSearch />}
                    _hover={{ cursor: 'pointer' }}
                    bg={useColorModeValue('gray.700', 'gray.400')}
                    borderLeftRadius={5}
                    color={'white'}
                    focusBorderColor="gray.700"
                />

                <Input
                    type="text"
                    onChange={e => handleFilter(e.target.value)}
                    placeholder="Rechercher..."
                    bg={'transparent'}
                    focusBorderColor="gray.200"
                    borderWidth={0.5}
                    borderRadius={5}
                    borderColor={'gray.400'}
                />
            </InputGroup>
            <Flex
                justify={'center'}
                align={'center'}
                w={{ base: '100%', lg: '32rem' }}
                boxShadow={'md'} my={2}
                position={{ base: 'relative', lg: 'absolute' }}
                bg={useColorModeValue('white', 'gray.400')}
            >
                <TableContainer>
                    <Table>
                        <Tbody>
                            {Object.values(data).map(item => {
                                return <Tr>
                                    <Link to={`/singleProduct/${item._id}`}>
                                        <Td>{item.nom_com}</Td>
                                        <Td>{item.dosage}</Td>
                                        <Td>{item.prix} FCFA</Td>
                                    </Link>
                                </Tr>
                            })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Box>
    )
}