import {
  Box, Button, Flex, FormControl, FormLabel, Heading, IconButton,
  Input, InputGroup, InputLeftElement, Select, Spacer,
  Spinner,
  Stack, Tab, TabList, TabPanel, TabPanels, Table, TableCaption,
  TableContainer, Tabs, Tbody, Td, Textarea, Th, Thead, Tr,
  useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaEdit, FaFileImage, FaSearch, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import ErrorModal from '../login/ErrorModal'
import AuthContext from '../../store/authContext'
import Wrapper from '../login/Helpers/Wrapper'

function Produit() {
  const productCtx = useContext(AuthContext)
  //fetching data
  const [medoc, setMedoc] = useState([])
  //pour filter les données pour la  la recherche
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  const handleFilter = (value) => {
    const res = filterData.filter(f => f.nom_com.toLowerCase().includes(value))
    setData(res)
    if (value === "") {
      setData([])
    }
  }

  useEffect(() => {
    //récupération des produits
    fetch("http://127.0.0.1:5000/listProduct", {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${productCtx.token}`
      }
    })
      .then(resp => resp.json())
      .then(data => setMedoc(data))

    fetch('http://127.0.0.1:5000/listProduct', {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${productCtx.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setFilterData(data)
      })
      .catch(err => console.log(err))


  }, [medoc])
  //console.log(data)

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
          h={{ base: '23vh', lg: '20vh', xl: '15vh' }}
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
              Gestion des produits
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
                        <Link to={`/admin/singleAdminProduct/${item._id}`}>
                          <Td>{item.nom_com}</Td>
                          <Td>{item.dosage}</Td>
                          <Td textAlign={'start'}>{item.prix} FCFA</Td>
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
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Médicaments en stock</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Opération d'entrée</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Catégories</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Inventaire</Tab>
              </TabList>

              <TabPanels mt={{ base: '13rem', lg: '4.5rem' }}>
                <TabPanel>
                  <ListeMédicaments items={medoc} />
                </TabPanel>

                <TabPanel>
                  <ProdForm />
                </TabPanel>

                <TabPanel>
                  <CreerCategorie />
                </TabPanel>

                <TabPanel>
                  <Inventaire />
                </TabPanel>

              </TabPanels>
            </Tabs>
          </Flex>
        </Stack>

      </Flex>
    </>
  )
}
export default Produit

const ProdForm = () => {
  const [cat, setCat] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/listCat")
      .then(res => res.json())
      .then(data => setCat(data))
  }, [cat])

  const num_lotInputRef = useRef()
  const nom_comInputRef = useRef()
  const dosageInputRef = useRef()
  const qte_stockInputRef = useRef()
  const prixInputRef = useRef()
  const date_fabInputRef = useRef()
  const date_perInputRef = useRef()
  const categorieInputRef = useRef()
  const descriptionInputRef = useRef()
  const imageInputRef = useRef()

  //utilisation du context
  const productCtx = useContext(AuthContext)
  //console.log(productCtx)
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

    const enteredNum_lot = num_lotInputRef.current.value
    const enteredNom_com = nom_comInputRef.current.value
    const enteredDosage = dosageInputRef.current.value
    const enteredQte_stock = qte_stockInputRef.current.value
    const enteredPrix = prixInputRef.current.value
    const enteredDate_fab = date_fabInputRef.current.value
    const enteredDate_per = date_perInputRef.current.value
    const enteredCategorie = categorieInputRef.current.value
    const enteredDescription = descriptionInputRef.current.value
    const enteredImage = imageInputRef.current.value

    //execution de la requête api
    const url = "http://127.0.0.1:5000/registerProduct"
    //async function fetch
    const fetchHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            num_lot: enteredNum_lot,
            nom_com: enteredNom_com,
            dosage: enteredDosage,
            qte_stock: enteredQte_stock,
            prix: enteredPrix,
            date_fab: enteredDate_fab,
            date_per: enteredDate_per,
            categorie: enteredCategorie,
            description: enteredDescription,
            image: enteredImage,
            user: productCtx.userEmail
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${productCtx.token}`
          }
        });

        const dataResponse = await response.json()
        //le sever a repondu, le chargement a terminé
        setIsLoading(false)

        if (response.ok) {
          setData(dataResponse)
          console.log(dataResponse)
          productCtx.addProduct(dataResponse.num_lot, dataResponse.image, dataResponse.categorie, dataResponse.nom_com, dataResponse.dosage, dataResponse.qte_stock, dataResponse.prix, dataResponse.date_fab, dataResponse.date_per, dataResponse.description)
          //Rendre vide le formulaire
          num_lotInputRef.current.value = ""
          nom_comInputRef.current.value = ""
          dosageInputRef.current.value = ""
          qte_stockInputRef.current.value = ""
          prixInputRef.current.value = ""
          date_fabInputRef.current.value = ""
          date_perInputRef.current.value = ""
          categorieInputRef.current.value = ""
          descriptionInputRef.current.value = ""
          imageInputRef.current.value = ""
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
    };

    //message qui previent le chargement
    setIsLoading(true)
    fetchHandler()

  }
  const errorHandler = () => {
    setError(null)
  }
  //console.log(data)

  return (
    <Wrapper>
      {error &&
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      }
      <Box
        position={'fixed'}
        w={'100%'}
        h={'3vh'}
        bg={useColorModeValue('white', 'black')}
        zIndex={1}
      >
      </Box>
      <Heading
        pos={'fixed'}
        fontSize={20}
        left={{ base: '23%', lg: '50%' }}
        zIndex={2}
        w={'100%'}
      >
        Ajouter un nouveau produit
      </Heading>
      <Flex
        position={{ base: 'relative', lg: 'relative', xl: 'fixed' }}
        my={2}
        align={'center'}
        right={{ xl: '-8rem' }}
        mt={'3rem'}
        justify={'center'}
        w={'100%'}
      >
        <form onSubmit={submitHandler}>
          <Flex
            align={'center'}
            justify={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <FormControl>
              <FormLabel>Numero_Lot</FormLabel>
              <Input
                ref={num_lotInputRef}
                name='num_lot'
                type='text'
                placeholder='Entrez le N° de lot svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Nom commercial</FormLabel>
              <Input
                ref={nom_comInputRef}
                name='nom_com'
                type='text'
                placeholder='Entrez le nom svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Dosage</FormLabel>
              <Input
                ref={dosageInputRef}
                name='dosage'
                type='text'
                placeholder='Entrez le dosage svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Quantité</FormLabel>
              <Input
                ref={qte_stockInputRef}
                name='qte_stock'
                type='number'
                placeholder='Entrez la quantité svp!'
              />
            </FormControl>
          </Flex>
          <Flex
            align={'center'}
            justify={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <FormControl>
              <FormLabel>Date_Fab</FormLabel>
              <Input
                ref={date_fabInputRef}
                name='date_fab'
                type='Date'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Date_Exp</FormLabel>
              <Input
                ref={date_perInputRef}
                name='date_per'
                type='Date'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Prix</FormLabel>
              <Input
                ref={prixInputRef}
                name='prix'
                type='number'
                placeholder='Entrez le prix svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Catégorie</FormLabel>

              <Select
                ref={categorieInputRef}
                placeholder='Choisir une catégorie'
                name='cat'
              >
                {cat.map(item => {
                  return <option value={item.nom}>{item.nom}</option>
                })}
              </Select>
            </FormControl>
          </Flex>
          <Flex
            align={'center'}
            justify={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <FormControl ml={{ base: 0, lg: 1 }}>
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={descriptionInputRef}
                name='description'
                type='text'
                placeholder='Veuillez donner la description svp !'
              />
            </FormControl>

            <FormControl ml={{ base: 0, lg: 2 }} w={'20rem'}>
              <FormLabel>Image</FormLabel>
              <InputGroup _hover={{ cursor: 'pointer' }}>
                <InputLeftElement
                  bg={'green.600'}
                  borderLeftRadius={5}
                  color={'white'}
                  children={<FaFileImage />}
                />
                <Input
                  ref={imageInputRef}
                  name='image'
                  type='file'
                  textAlign={'center'}
                  w={'100%'}
                  p={'0.3rem 0rem 1rem 1rem'}
                  _hover={{ cursor: 'pointer' }}
                />
              </InputGroup>
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
                p={'0.5rem 2rem'}
                mt={4}>
                Enregistrer
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
    </Wrapper>
  )
}

function ListeMédicaments({ items }) {

  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={{ base: '3vh', xl: '6.5vh' }}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        mt={{ xl: '1.5rem' }}
        pos={'fixed'}
        fontSize={20}
        left={{ base: '23%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
      >
        Liste des produits en stock
      </Heading >

      <TableContainer mt={{ base: '2rem', xl: '3.5rem' }} boxShadow={'md'}>
        <Table>
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'} w={'2rem'}>rayon</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>Nom</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>Dosage</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>Prix(FCFA)</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>Quantite</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>prix total</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}>date Exp</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color={'dark'} fontSize={15} textAlign={'center'}> Actions</Th>
            </Tr>
          </Thead>
          <Tbody mt={'5rem'}>
            {Object.values(items).map(item => {
              if (item.qte_stock <= 15) {
                return <Tr bg={'yellow.400'}>
                  <Td>{item.num_lot}</Td>
                  <Td>{item.nom_com}</Td>
                  <Td>{item.dosage}</Td>
                  <Td textAlign={'right'}>{item.prix}</Td>
                  <Td textAlign={'right'} >{item.qte_stock}</Td>
                  <Td textAlign={'right'} >{item.prix * item.qte_stock}</Td>
                  <Td>{item.date_per}</Td>
                  <Td>
                    <Link to={`/admin/editProduct/${item._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        color={'green'}
                      />
                    </Link>
                    <IconButton
                      ml={2}
                      icon={<FaTrash color={'red'} />}
                      onClick={e => deleteProduct(item._id)}
                    />
                  </Td>
                </Tr>
              } else {
                return <Tr>
                  <Td>{item.num_lot}</Td>
                  <Td >{item.nom_com}</Td>
                  <Td >{item.dosage}</Td>
                  <Td textAlign={'right'} >{item.prix}</Td>
                  <Td textAlign={'right'} >{item.qte_stock}</Td>
                  <Td textAlign={'right'} bg={'gray.200'} color={'black'}>{item.prix * item.qte_stock}</Td>
                  <Td>{item.date_per}</Td>
                  <Td>
                    <Link to={`/admin/editProduct/${item._id}`}>
                      <IconButton
                        icon={<FaEdit />}
                        color={'green'}
                      />
                    </Link>
                    <IconButton
                      ml={2}
                      icon={<FaTrash color={'red'} />}
                      onClick={e => deleteProduct(item._id)}
                    />
                  </Td>
                </Tr>
              }
            })
            }
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
          window.location.href = '/admin/produits'
        }).catch(err => console.log(err))
    }
  }
}

function Inventaire() {

  return (
    <>
      <Box
        position={'fixed'}
        w={'100%'}
        h={{ base: '3vh', xl: '6.5vh' }}
        bg={useColorModeValue('white', 'black')}
      >
      </Box>
      <Heading
        mt={{ xl: '1.5rem' }}
        pos={'fixed'}
        fontSize={20}
        left={{ base: '23%', lg: '50%' }}
        zIndex={1}
        w={'100%'}
      >
        Inventaire du stock
      </Heading>
      <TableContainer mt={{ base: '2rem', xl: '3.5rem' }} boxShadow={'md'}>
        <Table>
          <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
            <Tr id='titre' bgColor={'blue.200'}>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color='dark' textAlign={'center'} fontSize={15} >N°</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color='dark' textAlign={'center'} fontSize={15} w={'20rem'}>Désignation</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color='dark' textAlign={'center'} fontSize={15} >Sortie</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color='dark' textAlign={'center'} fontSize={15} >Reste</Th>
              <Th borderRightWidth={'1px'} fontWeight={'bold'} color='dark' textAlign={'center'} fontSize={15} >%</Th>
            </Tr>
          </Thead>
          <Tbody mt={'5rem'}>

          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

const CreerCategorie = () => {
  const [cat, setcat] = useState([])

  const nomInputRef = useRef()

  const catCtx = useContext(AuthContext)

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

    const enteredNom = nomInputRef.current.value

    const url = "http://127.0.0.1:5000/registerCat"

    const fetchHandler = async () => {

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            nom: enteredNom,
            user: catCtx.userNom,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${catCtx.token}`,
          }
        });

        const dataResponse = await response.json()

        //Le chargement
        setIsLoading(false)

        if (response.ok) {
          setData(dataResponse)
          console.log(dataResponse)
          catCtx.addCat(dataResponse.nom)

          //rendre le formulaire vide
          nomInputRef.current.value = " "
        } else {
          setError({
            title: "Echec d'enregistrement",
            message: dataResponse.error
          })
        }
        console.log(response)

        setData(dataResponse)

      } catch (error) {
        console.log(error)
      }

    }

    setIsLoading(true)
    fetchHandler()

  }
  const errorHandler = () => {
    setError(null)
  }


  useEffect(() => {
    fetch('http://localhost:5000/listCat', {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        Authorization: `Bearer ${catCtx.token}`
      }
    })
      .then(res => res.json())
      .then(data => setcat(data))
      .catch(error => console.log(error))
  }, [cat])

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
        minH={'60vh'}
        borderRadius={5}
        my={{ base: 2, lg: 0 }}
      >
        <Flex
          mt={{ xl: '1rem' }}
          mx={{ base: 3, lg: '3rem' }}
          p={2}
          position={'fixed'}
          flexDir={'column'}
        >
          <Flex>
            <form onSubmit={submitHandler}>
              <Flex
                align={'start'}
                flexDir={{ base: 'column', lg: 'column' }}
              >
                <FormControl>
                  <FormLabel>Catégorie</FormLabel>
                  <Input
                    ref={nomInputRef}
                    name='nom'
                    type='text'
                    placeholder='Entrez la catégorie!'
                  />
                </FormControl>
              </Flex>
              <Stack >
                <Button
                  type='submit'
                  _hover={{ bg: 'green.700' }}
                  bg={'green.600'}
                  borderRadius={5}
                  color={'white'}
                  w={'35%'}
                  mt={4}>
                  Ajouter
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
          mt={{ base: '9rem', lg: '10rem', xl: '0rem' }}
          p={5}
          flexDir={'column'}
        >
          <Flex
            my={2}
            align={'center'}
            justify={'spacebetween'}
            w={'100%'}
          >
            <TableContainer>
              <Table variant='striped'>
                <TableCaption>liste des catégories.</TableCaption>
                <Thead boxShadow={'6px 2px 8px gray'} border={'1px solid white'}>
                  <Tr
                    id='titre'
                    bgColor={'blue.200'}
                  >
                    <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color='dark' textAlign={'center'}>N°</Th>
                    <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color='dark' textAlign={'center'} w={'30rem'} >Catégories</Th>
                    <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color='dark' textAlign={'center'}>actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.values(cat).map(item => {
                    return <Tr>
                      <Td>{item.id}</Td>
                      <Td align='center' justifyContent={'center'}>{item.nom}</Td>
                      <Td textAlign={'center'}>
                        <IconButton
                          onClick={() => deleteCat(item.id)}
                          icon={<FaTrash color='red' />}
                          bg={'transparent'}
                        />
                      </Td>
                    </Tr>
                  })}
                </Tbody>

              </Table>
            </TableContainer>
          </Flex>
        </Flex>

      </Flex>

    </Wrapper>
  )
  function deleteCat(id) {
    const conf = window.confirm("Attention! Voulez-vous supprimer cette catégorie?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteCat/' + id, {
        method: 'DELETE',
        headers: {
          "Context-Type": "application/json",
          Authorization: `Bearer ${catCtx.token}`
        }
      })
        .then(res => {
          alert('La suppression a réussie!')
        }).catch(err => console.log(err))
    }
  }
}