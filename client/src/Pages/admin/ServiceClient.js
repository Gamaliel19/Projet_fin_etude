import React, { useState } from 'react'
import { Box, Flex, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'

function ServiceClient() {
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
      <Stack ml={5} mt={5} mr={'1rem'}>
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
              <Tab>Opération de sortie</Tab>
              <Tab>Commandes en cours</Tab>
              <Tab>Commandes terminées</Tab>
              <Tab>Rapport des ventes</Tab>
            </TabList>

            <TabPanels>
            <TabPanel>
                <p>Yeah yeah. Ici c'est l'op de sortie</p>
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
        </Box>
      </Stack>

    </Flex>
  )
}

export default ServiceClient
