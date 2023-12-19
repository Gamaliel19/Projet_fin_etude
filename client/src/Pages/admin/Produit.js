import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Tab, TabList,
  TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Textarea, Th, Thead, Tr, useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import httpClient from '../../httpClient'

function Produit() {
  const [tabIndex, setTabIndex] = useState(0)

  const handleSliderChange = (event) => {
    setTabIndex(parseInt(event.target.value, 10))
  }

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

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
          <Heading mt={5} fontSize={20}>Gestion des produits</Heading>
        </Box>
      </Stack>

      <Stack ml={5} mt={5} mr={'1rem'}>
        <Flex flexDir={'column'} w={'100%'}>
          <Flex display={{ base: 'none', lg: 'flex' }}>
            <input
              type='range'
              min='0'
              max='4'
              width={20}
              value={tabIndex}
              onChange={handleSliderChange}
            />
          </Flex>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList justifyItems={'center'} alignItems={'center'} w={{ base: '100%', lg: '90%' }} flexDir={{ base: 'column', lg: 'row' }}>
              <Tab>Opération d'entrée</Tab>
              <Tab>Médicaments en stock</Tab>
              <Tab>Catégories</Tab>
              <Tab>Rapports des entrées</Tab>
              <Tab>Inventaire</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProdForm />
              </TabPanel>


              <TabPanel>
                <ListeMédicaments />
              </TabPanel>

              <TabPanel>
                <p>Oh, hello there. This is Catégorie</p>
              </TabPanel>

              <TabPanel>
                <p>Oh, hello there. This Rapports</p>
              </TabPanel>

              <TabPanel>
                <p>Hello! This is inventaire.</p>
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
    num_lot: ""
  })
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setProduit({ ...produit, [e.target.name]: e.target.value })
  }

  useEffect(() => { }, [produit])

  /*const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // Do something with the files
    }
  })*/

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
        num_lot: ""
      })
    } catch (error) {
      if (error.response.status === 409) {
        alert("La connexion a échouée. Réessayez plus tard!")
      }
    }
  }

  return (
    <Flex boxShadow={'lg'} align={'center'} justify={'center'} my={8} textAlign={'left'}>
      <Flex my={10} >
        <form>
          <Flex
            align={'center'}
            justify={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <FormControl>
              <FormLabel>Numero_Lot</FormLabel>
              <Input
                value={produit.num_Lot}
                name='num_lot'
                onChange={(e) => handleChange(e)}
                type='number'
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
          <Stack align={'center'} justify={'center'}>
            <Button
              onClick={() => ajoutProd()}
              _hover={{ bg: 'green' }}
              bg={'green.600'}
              borderRadius={5}
              color={'white'}
              width={'30%'}
              mt={4}>
              Enregistrer
            </Button>
          </Stack>
        </form>
      </Flex>
    </Flex>
  )
}

/*
function CustomFileUpload(props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      // Do something with the files
    }
  })

  return (
    <FormControl {...getRootProps()}>
      <Input {...getInputProps()} />
      <Text>Télécharger un fichier image</Text>
    </FormControl>
  )
}



<FormControl {...getRootProps()} ml={{ base: 0, lg: 2 }}>
  <FormLabel>Image</FormLabel>
    <InputGroup>
      <InputRightElement children={<FaFile />} />
      <Input
        {...getInputProps}
        type='files'
        accept='image/*'
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder='Télécharger une image'
        _hover={{ cursor: 'pointer' }}
      />
    </InputGroup>
</FormControl>
*/

const ListeMédicaments = () => {
  const [medoc, setMedoc] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/listProduct")
      .then(resp => resp.json())
      .then(data => setMedoc(data))
    console.log(medoc)
  }, [])

  const listeMedoc = (items) => {
    return Object.values(items).map(item => {
      let n = item.lenght
      for (let i = 0; i < n; i++) {
        return <Tr>
          <Td>{item[i].num_lot}</Td>
          <Td>{item[i].nom_com}</Td>
          <Td>{item[i].dosage}</Td>
          <Td>{item[i].description}</Td>
          <Td>{item[i].prix}</Td>
          <Td>{item[i].qte_stock}</Td>
          <Td>{item[i].date_fab}</Td>
          <Td>{item[i].date_per}</Td>
        </Tr>
      }
    })
  }


  return (
    <Flex flexDir={'column'} boxShadow={'lg'} my={2} justify={'center'} align={'center'}>
      <Flex my={2} align={'center'} justify={'center'} w={'100%'}>
        <TableContainer>
          <Table variant='striped' colorScheme="blue">
            <Thead>
              <Tr
                alignItems={'center'}
                justifyItems={'center'}
                flexDirection={{ base: "column", lg: "row" }}
              >
                <Th>N° lot</Th>
                <Th>Nom com</Th>
                <Th>Dosage</Th>
                <Th>Description</Th>
                <Th>Prix</Th>
                <Th>Quantite</Th>
                <Th>Date Fab</Th>
                <Th>Date Exp</Th>
              </Tr>
            </Thead>
            <Tbody justifyContent={'center'}>
              {listeMedoc(medoc)}
            </Tbody>
          </Table>
        </TableContainer>

      </Flex>
    </Flex>
  )
}
