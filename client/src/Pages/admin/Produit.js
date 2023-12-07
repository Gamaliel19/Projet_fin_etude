import {
  Box,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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

  /*
        align={'center'}
      justify={'center'}
      flexDirection={"column"}
      bg={useColorModeValue('white', 'gray.700')}
      w={{ base: "100%", lg: "100%" }}
      p={{ base: '2rem', lg: "4rem" }}
      mt={{ base: '3rem', lg: '0.001rem' }}
  */

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
                <p>Ajouter des produits au stock</p>
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
