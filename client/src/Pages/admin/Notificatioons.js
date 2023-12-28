import React, { useState } from 'react'
import { Box, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'


function Notificatioons() {
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
          <Heading mt={5} fontSize={20}>Notifications</Heading>
        </Box>
      </Stack>

      <Stack ml={5} mt={5} mr={'1rem'}>
        <Flex flexDir={'column'} w={'100%'}>
          <Flex display={{ base: 'none', lg: 'flex' }}>
            <input
              type='range'
              min='0'
              max='3'
              width={20}
              value={tabIndex}
              onChange={handleSliderChange}
            />
          </Flex>
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList justifyItems={'center'} alignItems={'center'} w={{ base: '100%', lg: '90%' }} flexDir={{ base: 'column', lg: 'row' }}>
              <Tab>Produits en cours de rupture</Tab>
              <Tab>Produits en rupture</Tab>
              <Tab>Commandes en cours</Tab>
              <Tab>Nouveau compte</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre1</p>
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre2</p>
              </TabPanel>

              <TabPanel>
                <p>Yeah yeah. Ici c'est le paramètre3.</p>
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
