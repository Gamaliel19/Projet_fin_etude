import {
    SimpleGrid,
    List,
    ListItem,
    Tab, TabList, TabPanel, TabPanels, Tabs
} from '@chakra-ui/react'

export default function Dashboard() {

    return (
        <SimpleGrid p={{ base: '5px', lg: '2px' }}  columns={4} spacing={10} minChildWidth={"250px"}>
            <Tabs
                mt="40px"
                colorScheme="purple"
                variant="enclosed"
                align={'center'}
                justifyContent={'center'}
                minHeight={"100vh"}
                p={{ base: '20px', lg: '30px' }}
            >
                <TabList justifyContent={'space-between'} >
                    <Tab fontWeight={'bold'}>Formulaire vente</Tab>
                    <Tab fontWeight={'bold'}>Journal ventes</Tab>
                    <Tab fontWeight={'bold'}>Ajouter produits stock</Tab>
                    <Tab fontWeight={'bold'}>Produits en stock</Tab>
                    <Tab fontWeight={'bold'}>Faire Inventaire</Tab></TabList>

                <TabPanels>
                    <TabPanel>
                        <List spacing={4}>
                            <ListItem>

                            </ListItem>
                        </List>
                    </TabPanel>
                
                    <TabPanel>
                        <List spacing={4}>
                            <ListItem>

                            </ListItem>
                        </List>
                    </TabPanel>

                    <TabPanel>
                        <List spacing={4}>
                            <ListItem>

                            </ListItem>
                        </List>
                    </TabPanel>

                    <TabPanel>
                        <List spacing={4}>
                            <ListItem>

                            </ListItem>
                        </List>
                    </TabPanel>

                    <TabPanel>
                        <List spacing={4}>
                            <ListItem>
                                

                            </ListItem>
                        </List>
                    </TabPanel>
                   
                </TabPanels>
            </Tabs>
        </SimpleGrid>
    )
}