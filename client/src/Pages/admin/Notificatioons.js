import React, { useEffect, useState } from 'react'
import {
  Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement,
  Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody,
  Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { FaSearch, FaTrash } from 'react-icons/fa'
import axios from 'axios'

function Notificatioons() {
  const [data, setData] = useState([])
  const [product, setProduct] = useState([])
  const [productExp, setProductExp] = useState([])

  //pour filter les données pour la  la recherche
  const [result, setResult] = useState([])
  const [filterData, setFilterData] = useState([])

  const handleChange = (value) => {
    const res = filterData.filter(f => f.nom_com.toLowerCase().includes(value))
    setResult(res)
    if (value === "") {
      setResult([])
    }
  }


  useEffect(() => {
    fetch("http://127.0.0.1:5000/productEnRup")
      .then(res => res.json())
      .then(data => setData(data))

    fetch("http://127.0.0.1:5000/productEnCoursRup")
      .then(res => res.json())
      .then(data => setProduct(data))

    fetch("http://127.0.0.1:5000/expired_products")
      .then(res => res.json())
      .then(data => setProductExp(data))

    fetch('http://127.0.0.1:5000/expired_products')
      .then(res => res.json())
      .then(data => {
        setFilterData(data)
      })
      .catch(err => console.log(err))

  }, [])


  return (
    <>
      <Flex
        mt={-4}
        flexDir={'column'}
        ml={{ base: 0, lg: '15.6rem' }}
      >

        <Box
          position={'fixed'}
          w={'100%'}
          h={{ base: '26vh', lg: '16vh', xl: '15vh' }}
          bg={useColorModeValue('white', 'black')}
          zIndex={2}
        ></Box>

        <Flex
          mt={{ base: '1rem', lg: 5 }}
          display={{ base: 'none', lg: 'flex' }}
          align={'center'}
          justify={'center'}
          flexDir={'row'}
          zIndex={10}
        >
          <Box
            position={'fixed'}
            right={{ base: '40%', lg: '62%', xl: '70%' }}
            mt={0}
          >
            <Heading mt={5} fontSize={20}>
              Notifications
            </Heading>
          </Box>
          <Spacer />
          <Box
            mt={3}
            position={'fixed'}
            left={{ base: '16%', lg: '63%' }}
            p={'0.5rem 2rem'}
          >
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
                onChange={e => handleChange(e.target.value)}
                placeholder="Rechercher..."
                focusBorderColor="green.400"
                borderWidth={'2px'}
                borderRadius={5}
                borderColor={'gray.400'}
              />
            </InputGroup>
            <Flex
              ml={2.5}
              w={{ base: '100%', lg: '20rem' }}
              justify={'center'}
              align={'center'}
              boxShadow={'md'}
              my={2}
              position={{ base: 'relative', lg: 'absolute' }}
              bg={useColorModeValue('white', 'gray.400')}
            >
              <TableContainer>
                <Table>
                  <Tbody>
                    {Object.values(result).map(item => {
                      return <Tr>
                        <Td>{item.nom_com}</Td>
                        <Td>{item.dosage}</Td>
                        <Td>{item.qte_stock}</Td>
                      </Tr>
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

          </Box>

        </Flex>

        <Stack
          ml={5}
          mt={{ base: -19.5, lg: '1rem' }}
          mr={'1rem'}
        >
          <Flex flexDir={'column'} w={'100%'}>
            <Tabs colorScheme='blue' variant={'enclosed'}>
              <TabList
                position={'fixed'}
                mt={{ base: '3rem', lg: '1.5rem' }}
                ml={{ base: '-5', lg: '' }}
                justifyItems={'center'}
                alignItems={'center'}
                w={{ base: '100%', lg: '90%' }}
                flexDir={{ base: 'column', lg: 'row' }}
                zIndex={3}
              >
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Produits en cours de rupture</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Produits en rupture</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Produits expirés</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>{/*Commandes en cours*/}</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>{/*Nouveau compte*/}</Tab>
              </TabList>

              <TabPanels mt={{ base: '15rem', lg: '5rem' }}>
                <TabPanel>
                  <ProductEnCoursRup items={product} />
                </TabPanel>

                <TabPanel>
                  <ProductEnRup items={data} />
                </TabPanel>

                <TabPanel>
                  <ProductExp items={productExp} />
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
    </>
  )
}
export default Notificatioons

function ProductEnCoursRup({ items }) {
  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={'3vh'}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        pos={'fixed'}
        fontSize={20}
        left={{ base: '11%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
      >
        Liste des produits en cours de rupture
      </Heading>

      <TableContainer mt={'2rem'}>
        <Table>
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>rayon</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'} w={'15rem'}>Désignation</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>dosage</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Quantite</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map(item => {
              return <Tr>
                <Td>{item.num_lot}</Td>
                <Td>{item.nom_com}</Td>
                <Td>{item.dosage}</Td>
                <Td textAlign={'right'}>{item.qte_stock}</Td>
                <Td>
                  <IconButton
                    ml={2}
                    icon={<FaTrash color={'red'} />}
                    onClick={e => deleteProduct(item._id)}
                  />
                </Td>
              </Tr>
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
  function deleteProduct(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer ce produit?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteProduct/' + id)
        .then(res => {
          alert('Ce produit a été supprimé avec succès!')
        }).catch(err => console.log(err))
    }
  }
}
function ProductEnRup({ items }) {
  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={'3vh'}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        pos={'fixed'}
        fontSize={20}
        left={{ base: '20%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
      >
        Liste des produits en rupture
      </Heading>

      <TableContainer mt={'2rem'}>
        <Table boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>rayon</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'} w={'15rem'}>Désignation</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>dosage</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Quantite</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map(item => {
              return <Tr>
                <Td>{item.num_lot}</Td>
                <Td>{item.nom_com}</Td>
                <Td>{item.dosage}</Td>
                <Td textAlign={'right'}>{item.qte_stock}</Td>
                <Td>
                  <IconButton
                    ml={2}
                    icon={<FaTrash color={'red'} />}
                    onClick={e => deleteProduct(item._id)}
                  />
                </Td>
              </Tr>
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
  function deleteProduct(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer ce produit?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteProduct/' + id)
        .then(res => {
          alert('Ce produit a été supprimé avec succès!')
        }).catch(err => console.log(err))
    }
  }
}
function ProductExp({ items }) {
  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={'3vh'}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        pos={'fixed'}
        fontSize={20}
        left={{ base: '22%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
      >
        Liste des produits expirés
      </Heading>

      <TableContainer mt={'2rem'}>
        <Table>
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>rayon</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'} w={'15rem'}>Désignation</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>dosage</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Quantite</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Prix</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>date Exp</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'dark'} textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(items).map(item => {
              return <Tr>
                <Td>{item.num_lot}</Td>
                <Td>{item.nom_com}</Td>
                <Td>{item.dosage}</Td>
                <Td textAlign={'right'}>{item.qte_stock}</Td>
                <Td textAlign={'right'}>{item.prix}</Td>
                <Td textAlign={'right'}>{item.date_per}</Td>
                <Td textAlign={'center'}>
                  <IconButton
                    ml={2}
                    icon={<FaTrash color={'red'} />}
                    onClick={e => deleteProduct(item._id)}
                  />
                </Td>
              </Tr>
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
  function deleteProduct(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer ce produit?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteProduct/' + id)
        .then(res => {
          alert('Ce produit a été supprimé avec succès!')
        }).catch(err => console.log(err))
    }
  }
}