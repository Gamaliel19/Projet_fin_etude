import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Box, Button, Flex, FormControl, FormLabel, Heading, IconButton, Input,
  InputGroup, InputLeftElement, Spacer, Spinner, Stack, Tab, TabList, TabPanel, TabPanels,
  Table, TableContainer, Tabs, Tbody, Td, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import ErrorModal from '../login/ErrorModal'
import Wrapper from '../login/Helpers/Wrapper'


function Vente() {
  //pour filter les données pour la  la recherche
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  const handleFilter = (value) => {
    const res = filterData.filter(f => f.date.toLowerCase().includes(value))
    setData(res)
    if (value === "") {
      setData([])
    }
  }


  //list vente
  const [vente, setVente] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/ventes")
      .then(res => res.json())
      .then(data => {
        setVente(data)
      })
      .catch(error => console.log(error))

    //Pour la recherche d'une vente
    fetch('http://127.0.0.1:5000/ventes', {
      method: "GET",
      headers: {
        "Context-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setFilterData(data)
      })
      .catch(err => console.log(err))

  }, [])

  const authCtx = useContext(AuthContext)

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
          h={{ base: '20vh', lg: '21vh', xl: '16.5vh' }}
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
          >
            <InputGroup
              size={'sm'}
              w={{ base: '100%', lg: '20rem' }}
              boxShadow={'md'}
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
                onChange={e => handleFilter(e.target.value)}
                placeholder="Rechercher..."
                bg={'transparent'}
                focusBorderColor="green.400"
                borderWidth={'2px'}
                borderRadius={5}
                borderColor={'gray.400'}
              />
            </InputGroup>

            <Flex
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
                    {Object.values(data).map(item => {
                      return <Tr>
                        <Link to={`/admin/singleVente/${item.id}`}>
                          <Td>{item.designation}</Td>
                          <Td>{item.dose}</Td>
                          <Td textAlign={'start'}>{item.prix_total} FCFA</Td>
                        </Link>
                      </Tr>
                    })
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

          </Box>
        </Flex>

        <Stack
          ml={5}
          mt={{ base: -19.5, lg: -0.5 }}
          //mt={{ base: -20, lg: 5 }}
          mr={'1rem'}
        >
          <Flex flexDir={'column'} w={'100%'}>
            <Tabs colorScheme='blue' variant={'enclosed'}>
              <TabList
                position={'fixed'}
                mt={{ base: '3rem', lg: '2rem' }}
                ml={{ base: '-5', lg: '' }}
                justifyItems={'center'}
                alignItems={'center'}
                w={{ base: '100%', lg: '90%' }}
                flexDir={{ base: 'column', lg: 'row' }}
                zIndex={3}
              >
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Opération de sortie</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>{/*Commandes en cours*/}</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>{/*Commandes terminées*/}</Tab>
                {authCtx.userProfil == "admin" &&
                  <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Rapport des ventes</Tab>
                }
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
                  <RapportsVentes items={vente} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Stack>
      </Flex>
    </>
  )
}
export default Vente

function VenteForm() {
  const designationInputRef = useRef()
  const doseInputRef = useRef()
  const qteInputRef = useRef()

  //Appel du context
  const venteCtx = useContext(AuthContext)

  const isLoggedIn = venteCtx

  const [dataa, setDataa] = useState([])

  //gérer les erreurs
  const [error, setError] = useState(null)
  //isLoading,un text qui prévient que c'est en cours de chargement
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  //Controler s'il ya erreur ou non
  if (error) {
    //console.log("true")
  } else {
    //console.log("false")
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredDesignation = designationInputRef.current.value
    const enteredDose = doseInputRef.current.value
    const enteredQte = qteInputRef.current.value

    const url = "http://127.0.0.1:5000/vendre"

    const fetchHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            designation: enteredDesignation,
            dose: enteredDose,
            qte: enteredQte,
            email: venteCtx.userEmail,
            idUser: venteCtx.userId
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${venteCtx.token}`
          }
        });

        const dataResponse = await response.json()

        //Le chargement terminé
        setIsLoading(false)

        if (response.ok) {
          setData(dataResponse)
          console.log(dataResponse)
          venteCtx.addVente(dataResponse.designation, dataResponse.dose, dataResponse.qte)
          //Rendre le formulaire vide après l'enregistrement
          designationInputRef.current.value = ""
          doseInputRef.current.value = ""
          qteInputRef.current.value = ""
        } else {
          setError({
            title: "Echec d'enregistrement!",
            message: dataResponse.error
          })
        }
        console.log(response)

        setData(dataResponse)
      } catch (error) {
        console.log(error)
      }
    }

    //message qui prévient le chargement
    setIsLoading(true)
    fetchHandler()

  }

  const errorHandler = () => {
    setError(null)
  }
  //console.log(data)

  //Récupération des ventes par utilisateur
  const fetchHandler = async () => {
    try {
      const response = await fetch('', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${venteCtx.token}`
        }
      });

      const dataResponse = await response.json();
      if (response.ok) {
        console.log(dataResponse)
      } else {
        throw new Error(dataResponse.error)
      }

    } catch (error) {
      console.log("Problème server. La requête n'est pas partie!")
      console.log(error)
    }
  }
  fetchHandler()

  useEffect(() => {
    axios.get('http://localhost:5000/venteParUser/' + venteCtx.userId)
      .then(res => {
        console.log(res.data)
        setDataa(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(dataa)
  let taille = dataa.length
  return (
    <Wrapper>
      {error &&
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      }
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        borderRadius={5}
        my={{ base: 2, lg: 0 }}
      >
        <Flex
          my={{ base: 10, lg: 0 }}
          position={'fixed'}
        >
          <form onSubmit={submitHandler}>
            <Flex
              flexDir={{ base: 'column', lg: 'column' }}
              justify={'center'}
              align={'center'}
            >
              <FormControl ml={{ base: 0, lg: 2 }} mt={{ base: -20, lg: '0.5rem' }}>
                <FormLabel >Désignation</FormLabel>
                <Input
                  ref={designationInputRef}
                  name='designation'
                  type='text'
                  placeholder='Entrez le produit svp!'
                />
              </FormControl>
              <FormControl ml={{ base: 0, lg: 2 }} >
                <FormLabel >Dosage</FormLabel>
                <Input
                  ref={doseInputRef}
                  name='dose'
                  type='text'
                  placeholder='Entrez le dosage svp!'
                />
              </FormControl>
              <FormControl ml={{ base: 0, lg: 2 }} >
                <FormLabel >Quantité</FormLabel>
                <Input
                  ref={qteInputRef}
                  name='qte'
                  type='number'
                  placeholder='Entrez la quantité svp!'

                />
              </FormControl>
            </Flex>
            <Stack align={'center'} justify={'center'} >
              {!isLoading &&
                <Button
                  type='submit'
                  _hover={{ bg: 'green.700' }}
                  bg={'green.600'}
                  borderRadius={5}
                  border={'2px solid green.600'}
                  color={'white'}
                  w={'45%'}
                  mt={4}>
                  Effectuer
                </Button>
              }
              {isLoading && <Flex mt={5} p={'0.5rem'} justify={'center'} align={'center'} >
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='lg'
                />
              </Flex>}
            </Stack>
          </form>
        </Flex>

        <Spacer />
        <Flex
          display={{ base: 'none', lg: 'none', xl: 'flex' }}
          mx={{ base: 0, lg: 30 }}
          mt={{ base: '16rem', lg: '15+rem', xl: '-2rem' }}
          p={5}
          flexDir={'column'}
        >
          { /*<Flex mb={{ base: 8, lg: 0 }} justify={'center'} align={'start'}>
            <Heading fontSize={20} mb={{ base: -5, lg: 5 }} mt={5}>
              Ventes éffectuées
            </Heading>
          </Flex>*/}

          <Flex my={2} align={'center'} justify={'center'} w={'100%'} boxShadow={'md'}>
            <TableContainer>
              <Table variant='striped'>
                {/*<TableCaption>Facture finale pour l'opération de sortie.</TableCaption>*/}
                <Thead alignItems={'center'} justifyItems={'center'}>
                  <Tr
                    id='titre'
                    bgColor={'blue.200'}
                  >
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Désignation</Th>
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Dosage</Th>
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Prix_U</Th>
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Quantité</Th>
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Prix total</Th>
                    <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataa.map(item => {
                    return <Tr>
                      <Td>{item.designation}</Td>
                      <Td>{item.dose}</Td>
                      <Td textAlign={'right'}>{item.prix_unit}</Td>
                      <Td textAlign={'right'}>{item.qte}</Td>
                      <Td textAlign={'right'}>{item.prix_total}</Td>
                      <Td>
                        <Link to={`/admin/editVente/${item.id}`}>
                          <IconButton
                            icon={<FaEdit />}
                            color={'green'}
                          />
                        </Link>
                        <IconButton
                          ml={2}
                          icon={<FaTrash color={'red'} />}
                          onClick={e => deleteVente(item.id)}
                        />
                      </Td>
                    </Tr>
                  })}
                </Tbody>
              </Table>
            </TableContainer>

          </Flex>
          <Flex flexDir={'row'}>
            <Heading>Total:</Heading>
            <Spacer />
            {dataa.map(item => {
              return <Heading >
                {item.prix_total * taille}
              </Heading>
            })}
          </Flex>
        </Flex>

      </Flex>
    </Wrapper>
  )
  function deleteVente(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer cette vente?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteVente/' + id)
        .then(res => {
          alert('Cette vente a été supprimée avec succès!')
        }).catch(err => console.log(err))
    }
  }
}

function RapportsVentes({ items }) {
  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={'5vh'}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        pos={'fixed'}
        fontSize={20}
        left={{ base: '23%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
        mt={1}
      >
        Rapport des ventes
      </Heading>

      <TableContainer mt={'3rem'} boxShadow={'md'}>
        <Table >
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'} w={'10rem'}>Désignation</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Dosage</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Quantité</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Prix total</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>User</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Date de vente</Th>
              <Th borderRightWidth={'1px'} color={'dark'} fontWeight={'bold'} fontSize={15} textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>

          {Object.values(items).map(item => {
            return <Tbody mt={'20rem'}>

              <Tr>
              </Tr>
              <Tr>
                <Td >{item.designation}</Td>
                <Td >{item.dose}</Td>
                <Td textAlign={'right'}>{item.qte}</Td>
                <Td textAlign={'right'}>{item.prix_total}</Td>
                <Td>{item.idUser}</Td>
                <Td>{item.date}</Td>
                <Td textAlign={'center'}>
                  <IconButton
                    ml={2}
                    icon={<FaTrash color={'red'} />}
                    onClick={e => deleteVente(item.id)}
                  />
                </Td>
              </Tr>

            </Tbody>
          })
          }
        </Table>
      </TableContainer>
    </>
  )
  function deleteVente(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer cette vente?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteVente/' + id)
        .then(res => {
          alert('Cette vente a été supprimée avec succès!')
        }).catch(err => console.log(err))
    }
  }
}