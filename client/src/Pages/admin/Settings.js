import React, { useState } from 'react'
import { Box, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'


function Settings() {

  return (
    <Flex
      flexDir={'column'}
      mt={{ base: '3rem', lg: 8 }}
      minHeight={'100vh'}
      ml={{ base: 0, lg: '15.6rem' }}
    //bg={useColorModeValue('white', 'gray.700')}
    >
      <Flex
        align={'center'}
        justify={'center'}
        flexDir={'row'}
        ml={90}
      >
        <Box
          position={'fixed'}
          right={{ base: '30%', lg: '63%' }}
          mt={{ base: '6rem', lg: 0 }}
        >
          <Heading mt={5} fontSize={20}>
            Gestion des produits
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
              boxShadow={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
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
      <Stack ml={5} mt={5} mr={'1rem'}>
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
              <Tab>Taille de police</Tab>
              <Tab>Langue</Tab>
              <Tab>À propos</Tab>
            </TabList>

            <TabPanels mt={{ base: '15rem', lg: '5rem' }}>
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

export default Settings
