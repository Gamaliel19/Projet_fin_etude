import React, { useEffect, useState } from 'react'
import {
  Box, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement,
  Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody,
  Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

function Notificatioons() {
  const [data, setData] = useState([])
  const [product, setProduct] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/productEnRup")
      .then(res => res.json())
      .then(data => setData(data))

    fetch("http://127.0.0.1:5000/productEnCoursRup")
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [product, data])

  return (
    <Flex
      flexDir={'column'}
      mt={{ base: '3rem', lg: 8 }}
      minHeight={'100vh'}
      ml={{ base: 0, lg: '15.6rem' }}
    //bg={useColorModeValue('white', 'gray.700')}
    >
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        align={'center'}
        justify={'center'}
        flexDir={'row'}
        zIndex={10}
      >
        <Box
          position={'fixed'}
          right={{ base: '40%', lg: '53%', xl: '63%' }}
          mt={0}
        >
          <Heading mt={5} fontSize={20}>
            Notifications
          </Heading>
        </Box>
        <Spacer />
        <Box
          mt={3}
          //mr={50}
          position={'fixed'}
          left={{ base: '16%', lg: '63%' }}
          p={'0.5rem 2rem'}
        //bg={useColorModeValue('white', 'gray.700')}
        >
          <FormControl ml={{ base: 0, lg: 2 }}>
            <InputGroup
              size={'sm'}
              w={{ base: '100%', lg: '20rem' }}
              boxShadow={'md'}
              // bg={useColorModeValue('white', 'gray.700')}
              rounded={'lg'}
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
                value={''}
                onChange={() => { }}
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
      </Flex>
      <Stack
        ml={5}
        mt={{ base: -20, lg: 5 }}
        mr={'1rem'}
      >
        <Flex flexDir={'column'} w={'100%'}>
          <Tabs>
            <TabList
              position={'fixed'}
              mt={{ base: '3rem', lg: '1.5rem' }}
              ml={{ base: '-5', lg: '' }}
              justifyItems={'center'}
              alignItems={'center'}
              w={{ base: '100%', lg: '90%' }}
              flexDir={{ base: 'column', lg: 'row' }}
            >
              <Tab>Produits en cours de rupture</Tab>
              <Tab>Produits en rupture</Tab>
              <Tab>Commandes en cours</Tab>
              <Tab>Nouveau compte</Tab>
            </TabList>

            <TabPanels mt={{ base: '15rem', lg: '5rem' }}>
              <TabPanel>
                <ProductEnCoursRup items={product} />
              </TabPanel>

              <TabPanel>
                <ProductEnRup items={data} />
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est la commande en cours.</p>
              </TabPanel>
              <TabPanel>
                <p>Un nouveau compte vient d'être créé</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Stack>

    </Flex>
  )
}
export default Notificatioons

function ProductEnCoursRup({ items }) {
  return (
    <Flex my={2} flexDir={'column'} zIndex={'-10'}>
      <Flex
        mt={{ base: '-3', lg: '-1rem' }}
        mb={{ base: 8, lg: 0 }}
        left={{ lg: '45%' }}
        justify={'center'}
        align={'center'}
        position={'fixed'}
      >
        <Heading
          fontSize={20}
          mb={{ base: -5, lg: 5 }}
        >
          Liste des produits en cours de rupture
        </Heading>
      </Flex>
      <Flex
        my={2}
        align={'center'}
        mt={'3rem'}
        justify={'center'}
        w={'100%'}
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr id='titre' bgColor={'gray.600'}>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>N° lot</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'25rem'}>Désignation</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Quantite</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(item => {
                return <Tr>
                  <Td>{item.num_lot}</Td>
                  <Td>{item.nom_com}</Td>
                  <Td>{item.qte_stock}</Td>
                </Tr>
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  )
}
function ProductEnRup({ items }) {
  return (
    <Flex my={2} flexDir={'column'} zIndex={'-10'}>
      <Flex
        mt={{ base: '-3', lg: '-1rem' }}
        mb={{ base: 8, lg: 0 }}
        left={{ lg: '49%' }}
        justify={'center'}
        align={'center'}
        position={'fixed'}
      >
        <Heading
          fontSize={20}
          mb={{ base: -5, lg: 5 }}
        >
          Liste des produits en rupture
        </Heading>
      </Flex>
      <Flex
        my={2}
        align={'center'}
        mt={'3rem'}
        justify={'center'}
        w={'100%'}
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr id='titre' bgColor={'gray.600'}>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>N° lot</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'25rem'}>Désignation</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Quantite</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map(item => {
                return <Tr>
                  <Td>{item.num_lot}</Td>
                  <Td>{item.nom_com}</Td>
                  <Td>{item.qte_stock}</Td>
                </Tr>
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  )
}