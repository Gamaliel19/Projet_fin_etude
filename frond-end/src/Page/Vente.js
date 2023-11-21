import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  List,
  ListIcon,
  ListItem,
  Tab, TabList, TabPanel, TabPanels, Tabs
} from '@chakra-ui/react'
import React from 'react'

export default function Vente() {
  return (
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
        <Tab fontWeight={'bold'}>Formulaire de vente</Tab>
        <Tab fontWeight={'bold'}>Journal de ventes</Tab>
        <Tab fontWeight={'bold'}>Historique/ventes</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <List spacing={4}>
            <ListItem>
              <ListIcon />
              Paracetamol: 500mg
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel>
          <List minHeight={"100vh"} justifyContent={'center'}>
            <ListItem >
              <TableContainer >
                <Table variant='striped' colorScheme='teal'>
                  <TableCaption>Journal de ventes</TableCaption>
                  <Thead>
                    <Tr>
                      <Th isNumeric>N°</Th>
                      <Th>Nom </Th>
                      <Th>Description</Th>
                      <Th>Dosage</Th>
                      <Th isNumeric>Prix_unitaire</Th>
                      <Th isNumeric>Quantité</Th>
                      <Th isNumeric>Prix_total</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    <Tr>
                      <Td isNumeric>01</Td>
                      <Td>Paracétamol (mm)</Td>
                      <Td>Antibiaotique</Td>
                      <Td>500mg</Td>
                      <Td isNumeric>500</Td>
                      <Td isNumeric>2</Td>
                      <Td isNumeric>1000</Td>
                    </Tr>
                    <Tr>
                      <Td isNumeric>02</Td>
                      <Td>Paracétamol (mm)</Td>
                      <Td>Antibiaotique</Td>
                      <Td>500mg</Td>
                      <Td isNumeric>500</Td>
                      <Td isNumeric>2</Td>
                      <Td isNumeric>1000</Td>
                    </Tr>
                    <Tr>
                      <Td isNumeric>03</Td>
                      <Td>Paracétamol (mm)</Td>
                      <Td>Antibiaotique</Td>
                      <Td>500mg</Td>
                      <Td isNumeric>500</Td>
                      <Td isNumeric>2</Td>
                      <Td isNumeric>1000</Td>
                    </Tr>
                    <Tr>
                      <Td isNumeric>04</Td>
                      <Td>Paracétamol (mm)</Td>
                      <Td>Antibiaotique</Td>
                      <Td>500mg</Td>
                      <Td isNumeric>500</Td>
                      <Td isNumeric>2</Td>
                      <Td isNumeric>1000</Td>
                    </Tr>
                  </Tbody>

                </Table>

              </TableContainer>
            </ListItem>
          </List>

        </TabPanel>

      </TabPanels>
    </Tabs>
  )
}
