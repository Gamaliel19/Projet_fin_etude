import {
  List, 
  ListIcon, 
  ListItem, 
  Tab, 
  TabList, 
  TabPanel, 
  TabPanels, 
  Tabs
} from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Stock() {
  return (


    <Tabs
      mt="40px"
      p="20px"
      colorScheme="purple"
      variant="enclosed"
      align={'center'}
      justifyContent={'center'}
    >
      <TabList >
        <Tab _selected={{ color: "white", bg: "green" }}>Ajouter/Produits</Tab>
        <Tab _selected={{ color: "white", bg: "green" }}>Produits en stock</Tab>
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
          <List spacing={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} />
              Paracetamol
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} />
              Efferalgan
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color={"red"} />
              Dexamicine
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} />
              Paracetamol
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} />
              Efferalgan
            </ListItem>
            <ListItem>
              <ListIcon as={WarningIcon} color={"red"} />
              Dexamicine
            </ListItem>
          </List>
        </TabPanel>

      </TabPanels>
    </Tabs>



    /* <TableContainer >
       <Table variant='striped' colorScheme='teal'>
         <TableCaption>Imperial to metric conversion factors</TableCaption>
         <Thead>
           <Tr>
             <Th>To convert</Th>
             <Th>into</Th>
             <Th isNumeric>multiply by</Th>
           </Tr>
         </Thead>
         <Tbody>
           <Tr>
             <Td>inches</Td>
             <Td>millimetres (mm)</Td>
             <Td isNumeric>25.4</Td>
           </Tr>
           <Tr>
             <Td>feet</Td>
             <Td>centimetres (cm)</Td>
             <Td isNumeric>30.48</Td>
           </Tr>
           <Tr>
             <Td>yards</Td>
             <Td>metres (m)</Td>
             <Td isNumeric>0.91444</Td>
           </Tr>
         </Tbody>
         <Tfoot>
           <Tr>
             <Th>To convert</Th>
             <Th>into</Th>
             <Th isNumeric>multiply by</Th>
           </Tr>
         </Tfoot>
       </Table>
     </TableContainer>*/
  )
}
