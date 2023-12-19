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
                        <TabList >
                            <Tab>Gestion des utilisateurs</Tab>
                            <Tab>Gestion des clients</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ListeUsers />
                            </TabPanel>

                            <TabPanel>

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
    /* // The API URL.
     const APIurl = 'http://127.0.0.1:5000/listUser';
     // useState.
     const [users, setUsers] = useState([])
     // useEffect.
     useEffect(() => {
         fetch(APIurl, {
             'methods': 'GET',
             headers: {
                 'Content-Type': 'applications/json'
             }
         })
             .then(resp => resp.json())
             .then(resp => setUsers(resp))
             .catch(error => console.log(error))
     }, []);
 */
    //useState
    const [datas, setData] = useState(null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const resp = await fetch("http://127.0.0.1:5000/listUser")
            const data = await resp.json()
            setData(data)
            setLoad(true)
        }
        fetchUser()
    }, [])
    console.log(datas)


    return (
        <Flex flexDir={'column'} boxShadow={'lg'} justify={'center'} align={'center'} textAlign={'left'}>
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
                        {Object.values(datas).map(item => {
                            console.log(item)
                        }
                        )
                        }
                        <Tbody>

                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}

function ListeClients() {
    // The API URL.
    const APIurl = 'https://api.github.com/users';
    // useState.
    const [users, setUsers] = useState([]);
    // useEffect.
    useEffect(() => {
        fetch(APIurl)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

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
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.login}</Td>
                                    <Td>{user.avatar_url}</Td>
                                    <Td>{user.login}</Td>
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


/*

import { Button } from "@chakra-ui/react";

function ButtonList() {
  const buttonList = [];
  for (let i = 0; i < 5; i++) {
    buttonList.push(<Button key={i}>Button {i}</Button>);
  }
  return <>{buttonList}</>;
}

*/