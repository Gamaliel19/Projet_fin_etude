import React, { useState } from 'react'
import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input,
  InputGroup, InputLeftElement,
  ListItem,
  Spacer, Stack, Tab, TabList, TabPanel, TabPanels,
  Table, TableCaption, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa'


function Vente() {

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
      >
        <Box
          position={'fixed'}
          right={{ base: '40%', lg: '53%', xl: '63%' }}
          mt={0}
        >
          <Heading mt={5} fontSize={20}>
            Gestion des Ventes
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
      <Stack ml={5} mt={{ base: -20, lg: 5 }} mr={'1rem'}>
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
              <Tab>Opération de sortie</Tab>
              <Tab>Commandes en cours</Tab>
              <Tab>Commandes terminées</Tab>
              <Tab>Rapport des ventes</Tab>
            </TabList>

            <TabPanels mt={{ base: '15rem', lg: '5rem' }}>
              <TabPanel>
                <VenteForm />
              </TabPanel>
              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre1</p>
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre2</p>
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre3.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Stack>

    </Flex>
  )
}

export default Vente

function VenteForm() {
  /*const [vente, setVente] = useState({
    designation: "",
    dosage: "",
    qte: "",
  })*/

  const { register, handleSubmit, reset } = useForm();
  const [items, setItems] = useState([]);

  const onSubmit = (data) => {
    setItems([...items, data]);
    reset();
  };

  return (
    <Flex
      flexDir={{ base: 'column', lg: 'row' }}
      borderRadius={5}
      my={{ base: 2, lg: 0 }}
    >
      <Flex
        mx={{ base: 3, lg: '3rem' }}
        p={2}
        mt={{ base: '-5rem', lg: '-1rem' }}
        position={'fixed'}
        flexDir={'column'}
      >
        <Flex my={{ base: 10, lg: 0 }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              flexDir={{ base: 'column', lg: 'column' }}
              justify={'center'}
              align={'center'}
            >
              <FormControl isRequired ml={{ base: 0, lg: 2 }} >
                <FormLabel >Désignation</FormLabel>
                <Input
                  name='designation'
                  placeholder='Entrez le nom du produit svp!'
                />
              </FormControl>
              <FormControl isRequired ml={{ base: 0, lg: 2 }} >
                <FormLabel >Dosage</FormLabel>
                <Input
                  name='dosage'
                  placeholder='Entrez le dosage svp!'
                />
              </FormControl>
              <FormControl isRequired ml={{ base: 0, lg: 2 }} >
                <FormLabel >Quantité</FormLabel>
                <Input
                  name='qte'
                  placeholder='Entrez la quantité svp!'
                />
              </FormControl>
            </Flex>
            <Stack>
              <Button
                type='submit'
                _hover={{ bg: 'green.700' }}
                bg={'green.600'}
                borderRadius={5}
                color={'white'}
                w={'45%'}
                mt={4}>
                Effectuer
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
      <Spacer />
      <Flex
        display={{ base: 'none', lg: 'none', xl: 'flex' }}
        boxShadow={'md'}
        mx={{ base: 0, lg: 30 }}
        mt={{ base: '16rem', lg: '19rem', xl: '0.5rem' }}
        p={5}
        flexDir={'column'}
      >
        <Flex mb={{ base: 8, lg: 0 }} justify={'center'} align={'start'}>
          <Heading fontSize={20} mb={{ base: -5, lg: 5 }}>
            Facture N°_____
          </Heading>
        </Flex>
        <Flex my={2} align={'center'} justify={'center'} w={'100%'}>
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>Facture finale pour l'opération de sortie.</TableCaption>
              <Thead alignItems={'center'} justifyItems={'center'}>
                <Tr
                  id='titre'
                  flexDirection={{ base: "column", lg: "row" }}
                  bgColor={'gray.600'}
                >
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} >N°</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'15rem'}>Désignation</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Prix_U</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Quantité</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Prix total</Th>
                </Tr>
              </Thead>

              <Tbody>


              </Tbody>

            </Table>
          </TableContainer>
        </Flex>
      </Flex>

    </Flex>
  )
}