import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useState } from 'react'

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

      <Stack ml={5} mt={5}>
        <Box>
          <input
            type='range'
            min='0'
            max='3'
            value={tabIndex}
            onChange={handleSliderChange}
          />

          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Ajouter des médicaments</Tab>
              <Tab>Liste des médicaments</Tab>
              <Tab>Historique des ajouts</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ProdForm />
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est la liste des médicaments?</p>
              </TabPanel>

              <TabPanel>
                <p>Oh, hello there.</p>
              </TabPanel>
              
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>

    </Flex>
  )
}

export default Produit



const ProdForm = () => {
  return (
    <Flex align={'center'} justify={'center'} my={8} textAlign={'left'}>
      <form>
        <FormControl>
          <FormLabel>Adresse Email</FormLabel>
          <Input
            value={''}
            onChange={() => { }}
            type=''
            placeholder=''
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            value={''}
            onChange={() => { }}
            type=''
            placeholder=''
          />
        </FormControl>
        <Button
          onClick={() => { }}
          variant={'solid'}
          colorScheme='teal'
          width={'full'}
          mt={4}>
          Connexion
        </Button>
        <Stack color='blue.400' mt={4} textAlign={'center'}>
          <Text>Vous n'avez pas de compte? <Link href="" color='teal'>Créez ici!</Link></Text>
        </Stack>

      </form>
    </Flex>
  )
}