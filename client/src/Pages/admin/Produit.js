import {
  Box, Button, Flex, FormControl, FormLabel, Heading, IconButton,
  Input, InputGroup, InputLeftElement, Link, Select, Spacer,
  Stack, Tab, TabList, TabPanel, TabPanels, Table, TableCaption,
  TableContainer, Tabs, Tbody, Td, Textarea, Th, Thead, Tr,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa'
import httpClient from '../../httpClient'
import axios from 'axios'
import ErrorModal from '../login/ErrorModal'


function Produit() {
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
    fetch("http://127.0.0.1:5000/listProduct")
      .then(resp => resp.json())
      .then(data => setMedoc(data))

    fetch('http://127.0.0.1:5000/listProduct')
      .then(res => res.json())
      .then(data => {
        setFilterData(data)
      })
      .catch(err => console.log(err))


  }, [])
  console.log(data)

  return (
    <Flex
      flexDir={'column'}
      mt={{ base: '3rem', lg: 8 }}
      minHeight={'100vh'}
      ml={{ base: 0, lg: '15.6rem' }}
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
            flexDir={'column'}
            justify={'center'}
            align={'center'}
            boxShadow={'md'} my={2}
            position={{ base: 'relative', lg: 'absolute' }}
            bg={useColorModeValue('white', 'gray.400')}
          >
            <TableContainer>
              <Table>
                <Tbody>
                  {Object.values(data).map(item => {
                    return <Tr>
                      <Link to={`/singleProduct/${item._id}`}>
                        <Td>{item.nom_com}</Td>
                        <Td>{item.dosage}</Td>
                        <Td>{item.prix} FCFA</Td>
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
              <Tab>Médicaments en stock</Tab>
              <Tab>Opération d'entrée</Tab>
              <Tab>Catégories</Tab>
              <Tab>Inventaire</Tab>
            </TabList>

            <TabPanels mt={{ base: '15rem', lg: '5rem' }}>

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
  )
}
export default Produit

const ProdForm = () => {

  const [produit, setProduit] = useState({
    dosage: "",
    nom_com: "",
    description: "",
    prix: "",
    date_fab: "",
    date_per: "",
    qte_stock: "",
    num_lot: "",
  })
  const [cat, setCat] = useState([])

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setProduit({ ...produit, [e.target.name]: e.target.value })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // Do something with the files
    }
  })

  const ajoutProd = async () => {
    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/registerProduct", { ...produit })
      window.location.href = "../admin/produits"
      setProduit({
        dosage: "",
        nom_com: "",
        description: "",
        prix: "",
        date_fab: "",
        date_per: "",
        qte_stock: "",
        num_lot: "",
      })
      console.log(resp.data)
    } catch (error) {
      if (error.response.status === 409) {
        alert("La connexion a échouée. Réessayez plus tard!")
      }
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/listCat")
      .then(res => res.json())
      .then(data => setCat(data))
      .catch(error => console.log(error))
  }, [])
  console.log(cat)

  return (
    <Flex my={2} flexDir={'column'} zIndex={'-10'} >
      <Flex
        mt={{ base: '-3', lg: '-1rem' }}
        mb={{ base: 8, lg: 0 }}
        left={{ lg: '50%' }}
        justify={'center'}
        align={'center'}
        position={'fixed'}
      >
        <Heading
          fontSize={20}
          mb={{ base: -5, lg: 5 }}
        >
          Ajouter un nouveau produit
        </Heading>
      </Flex>
      <Flex
        position={{ base: 'relative', lg: 'fixed' }}
        my={2}
        align={'center'}
        right={{ lg: '-8rem' }}
        mt={'3rem'}
        justify={'center'}
        w={'100%'}
      >
        <form>
          <Flex
            align={'center'}
            justify={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <FormControl>
              <FormLabel>Numero_Lot</FormLabel>
              <Input
                value={produit.num_lot}
                name='num_lot'
                onChange={(e) => handleChange(e)}
                type='text'
                placeholder='Entrez le N° de lot svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Nom commercial</FormLabel>
              <Input
                value={produit.nom_com}
                name='nom_com'
                onChange={(e) => handleChange(e)}
                type='text'
                placeholder='Entrez le nom svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Dosage</FormLabel>
              <Input
                value={produit.dosage}
                name='dosage'
                onChange={(e) => handleChange(e)}
                type='text'
                placeholder='Entrez le dosage svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Quantité</FormLabel>
              <Input
                value={produit.qte_stock}
                name='qte_stock'
                onChange={(e) => handleChange(e)}
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
                value={produit.date_fab}
                name='date_fab'
                onChange={(e) => handleChange(e)}
                type='Date'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Date_Exp</FormLabel>
              <Input
                value={produit.date_per}
                name='date_per'
                onChange={(e) => handleChange(e)}
                type='Date'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Prix</FormLabel>
              <Input
                value={produit.prix}
                name='prix'
                onChange={(e) => handleChange(e)}
                type='number'
                placeholder='Entrez le prix svp!'
              />
            </FormControl>
            <FormControl ml={{ base: 0, lg: 2 }}>
              <FormLabel>Catégorie</FormLabel>

              <Select
                value={produit.cat}
                placeholder='Catégorie'
                name='cat'
              >
                {cat.map(item => {
                  return <option value={item.nom}>{item.nom}</option>
                })}
              </Select>
            </FormControl>
            {/* <FormControl ml={{ base: 0, lg: 2 }} {...getRootProps()}>
              <FormLabel>Image</FormLabel>
              <InputGroup _hover={{ cursor: 'pointer' }}>
                <InputLeftElement
                  bg={'green.600'}
                  borderLeftRadius={5}
                  color={'white'}
                  children={<FaFileImage />}
                />
                <Input {...getInputProps}
                  value={produit.image}
                  name='image'
                  onChange={(e) => handleChange(e)}
                  type='file'
                  _hover={{ cursor: 'pointer' }}
                />
              </InputGroup>
            </FormControl>*/}
          </Flex>
          <FormControl ml={{ base: 0, lg: 1 }}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={produit.description}
              name='description'
              onChange={(e) => handleChange(e)}
              type='text'
              placeholder='Veuillez donner la description svp !'
            />
          </FormControl>
          <Stack align={'center'} justify={'center'} >
            <Button
              onClick={() => ajoutProd()}
              _hover={{ bg: 'green.700' }}
              bg={'green.600'}
              borderRadius={5}
              border={'2px solide black'}
              color={'white'}
              p={'0.5rem 2rem'}
              mt={4}>
              Enregistrer
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  )
}

function ListeMédicaments({ items }) {

  return (
    <Flex my={2} flexDir={'column'} zIndex={'-10'} >
      <Flex
        mt={{ base: '-3', lg: '-1rem' }}
        mb={{ base: 8, lg: 0 }}
        left={{ lg: '50%' }}
        justify={'center'}
        align={'center'}
        position={'fixed'}
      >
        <Heading
          fontSize={20}
          mb={{ base: -5, lg: 5 }}
        >
          Liste des produits en stock
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
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'25rem'}>Nom com</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Dosage</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Prix(FCFA)</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>Quantite</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>prix total</Th>
                <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}></Th>
              </Tr>
            </Thead>
            <Tbody mt={'20rem'} >
              {Object.values(items).map(item => {
                if (item.qte_stock <= 15) {
                  return <Tr bg={'yellow.400'}>
                    <Td>{item.num_lot}</Td>
                    <Td >{item.nom_com}</Td>
                    <Td >{item.dosage}</Td>
                    <Td >{item.prix}</Td>
                    <Td >{item.qte_stock}</Td>
                    <Td >{item.prix * item.qte_stock}</Td>
                    <Td>
                      <Link href={`/admin/editProduct/${item._id}`}>
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
                    <Td >{item.prix}</Td>
                    <Td >{item.qte_stock}</Td>
                    <Td bg={'gray.200'} color={'black'}>{item.prix * item.qte_stock}</Td>
                    <Td>
                      <Link href={`/admin/editProduct/${item._id}`}>
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
      </Flex>
    </Flex>
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
    <Flex my={2} flexDir={'column'} zIndex={'-10'}>
      <Flex
        mt={{ base: '-3', lg: '-1rem' }}
        mb={{ base: 8, lg: 0 }}
        left={{ lg: '52%' }}
        justify={'center'}
        align={'center'}
        position={'fixed'}
      >
        <Heading
          fontSize={20}
          mb={{ base: -5, lg: 5 }}
        >Inventaire du stock</Heading>
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
                <Th fontWeight={'bold'} fontSize={15} color={'white'}>N°</Th>
                <Th fontWeight={'bold'} fontSize={15} color={'white'} w={'20rem'}>Désignation</Th>
                <Th fontWeight={'bold'} fontSize={15} color={'white'}>Sortie</Th>
                <Th fontWeight={'bold'} fontSize={15} color={'white'}>Reste</Th>
                <Th fontWeight={'bold'} fontSize={15} color={'white'}>%</Th>
              </Tr>
            </Thead>
            <Tbody>

            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  )
}

const CreerCategorie = () => {
  const [cat, setcat] = useState([])
  const [cat2, setcat2] = useState({ nom: "" })

  const [error, setError] = useState(null)
  const errorHandler = () => {
    setError(null)
  }
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setcat2({ ...cat2, [e.target.name]: e.target.value })
  }
  const addCat = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/registerCat", { ...cat2 })
      setcat2({
        nom: ""
      })
    } catch (eror) {
      setError({
        title: "Attention!",
        message: "Cette catégorie existe déjà. Renseignez bien la nouvelle catégorie!"
      })
      if (eror.response.status === 408) {
        return <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      }
    }
  }
  useEffect(() => {
    fetch('http://localhost:5000/listCat')
      .then(res => res.json())
      .then(data => setcat(data))
      .catch(error => console.log(error))
  }, [cat])

  return (
    <Flex
      flexDir={{ base: 'column', lg: 'row' }}
      minH={'60vh'}
      borderRadius={5}
      my={{ base: 2, lg: 0 }}
    >
      <Flex
        mx={{ base: 3, lg: '3rem' }}
        p={2}
        position={'fixed'}
        flexDir={'column'}
      >
        <Flex>
          <form>
            <Flex
              align={'start'}
              flexDir={{ base: 'column', lg: 'column' }}
            >
              <FormControl>
                <FormLabel>Catégorie</FormLabel>
                <Input
                  value={cat2.nom}
                  name='nom'
                  onChange={(e) => handleChange(e)}
                  type='text'
                  placeholder='Entrez la catégorie!'
                />
              </FormControl>
            </Flex>
            <Stack >
              <Button
                onClick={() => addCat()}
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
              <Thead >
                <Tr
                  id='titre'
                  flexDirection={{ base: "column", lg: "row" }}
                  bgColor={'gray.600'}
                >
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>N°</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'} w={'30rem'} >Catégories</Th>
                  <Th borderRightWidth={'1px'} fontWeight={'bold'} fontSize={15} color={'white'} textAlign={'center'}>actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cat.map(item => {
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
  )
  function deleteCat(id) {
    const conf = window.confirm("Attention! Voulez-vous supprimer cette catégorie?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteCat/' + id)
        .then(res => {
          alert('La suppression a réussie!')
        }).catch(err => console.log(err))
    }
  }
}