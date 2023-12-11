import React, { useState } from 'react'
import {
    Box, CircularProgress, Flex, FormLabel, Stack, Tab, TabList,
    TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { Liste, ListeCl } from './test'

function GestionUsers() {
    const [tabIndex, setTabIndex] = useState(0)

    const handleSliderChange = (event) => {
        setTabIndex(parseInt(event.target.value, 10))
    }

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }
    return (
        <Flex
            flexDir={'column'}
            mt={{ base: '5rem', lg: '1rem' }}
            ml={{ base: 0, lg: '15.6rem' }}
            minHeight={'100vh'}
            bg={useColorModeValue('white', 'gray.700')}
        >
            <Stack ml={5} mt={5} mr={'1rem'}>
                <Box>
                    <input
                        type='range'
                        min='0'
                        max='1'
                        value={tabIndex}
                        onChange={handleSliderChange}
                    />

                    <Tabs index={tabIndex} onChange={handleTabsChange}>
                        <TabList>
                            <Tab>Gestion des utilisateurs</Tab>
                            <Tab>Gestion des clients</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ListeUsers />
                            </TabPanel>

                            <TabPanel>
                                <ListeClients />
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Box>
            </Stack>

        </Flex>
    )
}
export default GestionUsers

function ListeUsers(props) {
    function listeUser(profil) {
        return profil.map(item => {
            return <Tr>
                <Td>{item.email}</Td>
                <Td>{item.nom}</Td>
                <Td>{item.prenom}</Td>
                <Td>{item.profil}</Td>
            </Tr>
        })
    }

    if (!ListeUsers) {
        return <div><CircularProgress isIndeterminate color='green.300' /></div>
    }
    console.log(ListeUsers)

    return (
        <Flex flexDir={'column'} boxShadow={'lg'} align={'center'} justify={'center'} my={8} textAlign={'left'}>
            <FormLabel textAlign={"center"} m='5px auto'> Liste des utilisateurs enregistrés</FormLabel>
            <Flex my={5}>
                <TableContainer>
                    <Table variant='striped' colorScheme="blue">
                        <Thead>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Nom</Th>
                                <Th>Prenom</Th>
                                <Th>Profil</Th>
                            </Tr>
                        </Thead>

                        <Tbody>

                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}

function ListeClients(props) {
    function listeClient(nom) {
        return nom.map(item => {
            return <Tr>
                <Td>{item.email}</Td>
                <Td>{item.nom}</Td>
                <Td>{item.prenom}</Td>
            </Tr>
        })
    }

    if (!ListeClients) {
        return <div><CircularProgress isIndeterminate color='green.300' /></div>
    }
    console.log(ListeClients)

    return (
        <Flex flexDir={'column'} boxShadow={'lg'} align={'center'} justify={'center'} my={8} textAlign={'left'}>
            <FormLabel textAlign={"center"} m='5px auto'> Liste des clients enregistrés</FormLabel>
            <Flex my={5}>
                <TableContainer>
                    <Table variant='striped' colorScheme="blue">
                        <Thead>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Nom</Th>
                                <Th>Prenom</Th>
                            </Tr>
                        </Thead>

                        <Tbody>

                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}
