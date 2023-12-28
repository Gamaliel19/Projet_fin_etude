import React, { useEffect, useState } from "react";
import { InputGroup, Input, useColorModeValue, InputLeftElement, Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react'
import { FaSearch } from "react-icons/fa";

export const Search = () => {
    const [produit, setProduit] = useState({
        dosage: "",
        nom_com: "",
        description: "",
        prix: "",
        date_fab: "",
        date_per: "",
        qte_stock: "",
        num_lot: "",
        image: ""
    })

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setProduit({ ...produit, [e.target.name]: e.target.value })
    }

    const searchProduct = async () => {
        try {
            fetch("http://127.0.0.1:5000/searchProduct/<string:nom_com>", { ...produit })
        } catch (error) {
        }
    }
    useEffect(() => {
    }, [])
    return (
        <Menu>
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
                    bg={useColorModeValue('gray.700','gray.400')}
                    borderLeftRadius={5}
                    color={'white'}
                    focusBorderColor="gray.700"
                />

                <Input
                    type="text"
                    value={produit.nom_com}
                    name='nom_com'
                    onChange={(e) => handleChange(e)}
                    onPointerEnter={() => searchProduct()}
                    bg={'transparent'}
                    placeholder="Rechercher..."
                    focusBorderColor="gray.200"
                    borderWidth={0.5}
                    borderRadius={5}
                    borderColor={'gray.400'}
                />
            </InputGroup>
            {Object.values(produit).map(item => {
                return <MenuList>
                    <MenuItem>{produit.nom_com}</MenuItem>
                </MenuList>
            })
            }
        </Menu>
    )
}