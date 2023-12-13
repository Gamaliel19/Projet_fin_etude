import React, { useEffect, useState } from 'react'
import {
    Box, Flex, FormLabel, Stack, Tab, TabList,
    TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'


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

function ListeUsers() {
    // The API URL.
    const APIurl = 'https://api.github.com/users';
    // useState.
    const [users, setUsers] = useState([]);
    // useEffect.
    useEffect(() => {
        fetch(APIurl)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [users]);
    return (
        <Flex flexDir={'column'} boxShadow={'lg'} justify={'center'} align={'center'} my={8} textAlign={'left'}>
            <FormLabel textAlign={"center"} m='5px auto'> Liste des utilisateurs enregistrés</FormLabel>
            <Flex my={5}>
                <TableContainer>
                    <Table variant='striped' colorScheme="blue">
                        <Thead>
                            <Tr>
                                <Th>Messagerie Électronique</Th>
                                <Th>Nom</Th>
                                <Th>Prenom</Th>
                                <Th>Profil</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {users.map(user => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.login}</Td>
                                    <Td>{user.node_id}</Td>
                                    <Td>{user.avatar_url}</Td>
                                </Tr>
                            ))}
                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}

function ListeClients() {
    // The API URL.
    const APIurl = 'http://127.0.0.1:5000/listUser';
    // useState.
    const [users, setUsers] = useState([]);
    // useEffect.
    useEffect(() => {
        fetch(APIurl)
            .then(res => res.json())
            .then(data => setUsers(data));
        console.log(users)
    }, { users });

    return (
        <Flex flexDir={'column'} boxShadow={'lg'} align={'center'} my={8} textAlign={'left'}>
            <FormLabel textAlign={"center"} m='5px auto'> Liste des clients enregistrés</FormLabel>
            <Flex my={5}>
                <TableContainer>
                    <Table variant='striped' colorScheme="blue">
                        <Thead>
                            <Tr alignContent={'space-between'}>
                                <Th>Messagerie Électronique</Th>
                                <Th>Nom</Th>
                                <Th>Prenom</Th>
                                <Th>Profil</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {users.map(user => (
                                <Tr>
                                    <Td>{user.email}</Td>
                                    <Td>{user.nom}</Td>
                                    <Td>{user.prenom}</Td>
                                    <Td>{user.profil}</Td>
                                </Tr>
                            ))
                            }
                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}
