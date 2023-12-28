import React, { useEffect, useState } from 'react'
import {
    Box, Flex, Heading, Stack,
    TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'


function GestionUsers() {
    const [tabIndex, setTabIndex] = useState(0)

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5000/listUser")
            .then(resp => resp.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <Flex
            flexDir={'column'}
            mt={{ base: '5rem', lg: '1rem' }}
            minHeight={'100vh'}
            ml={{ base: 0, lg: '15.6rem' }}
            bg={useColorModeValue('white', 'gray.700')}
        >
            <Stack
                align={'center'}
                justify={'center'}
            >
                <Box>
                    <Heading mt={5} fontSize={20}>Gestion des utilisateurs</Heading>
                </Box>
            </Stack>

            <Stack ml={5} mt={5} mr={'1rem'}>
                <Flex flexDir={'column'} w={'100%'}>
                    <Tabs index={tabIndex} onChange={handleTabsChange}>

                        <TabPanels>
                            <TabPanel>
                                <ListeUsers items={users} />
                            </TabPanel>

                            <TabPanel>

                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Flex>
            </Stack>

        </Flex>
    )
}
export default GestionUsers

function ListeUsers({ items }) {
    return (
        <Flex flexDir={'column'} boxShadow={'lg'} my={2} justify={'center'} align={'center'}>
            <Flex my={2} align={'center'} justify={'center'} w={'100%'}>
                <TableContainer>
                    <Table variant='striped' colorScheme="blue">
                        <Thead alignItems={'center'} justifyItems={'center'}>
                            <Tr
                                id='titre'
                                alignItems={'center'}
                                justifyItems={'center'}
                                flexDirection={{ base: "column", lg: "row" }}
                            >
                                <Th>Messagerie Électronique</Th>
                                <Th>Nom</Th>
                                <Th>Prenom</Th>
                                <Th>Profil</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {Object.values(items).map(item => {
                                return <Tr>
                                    <Td>{item.email}</Td>
                                    <Td>{item.nom}</Td>
                                    <Td>{item.prenom}</Td>
                                    <Td>{item.profil}</Td>
                                </Tr>
                            })
                            }
                        </Tbody>

                    </Table>
                </TableContainer>

            </Flex>
        </Flex>
    )
}