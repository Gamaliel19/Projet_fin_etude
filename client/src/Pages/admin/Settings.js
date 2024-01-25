import React from 'react'
import {
  Box, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer,
  Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'


function Settings() {

  return (
    <>
      <Flex
        flexDir={'column'}
        ml={{ base: 0, lg: '15.6rem' }}
      >
        <Box
          position={'fixed'}
          w={'100%'}
          h={{ base: '17.5vh', lg: '16vh', xl: '15vh' }}
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
            right={{ base: '40%', lg: '60%', xl: '70%' }}
            mt={0}
          >
            <Heading mt={5} fontSize={20}>
              Paramètres
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
          </Box>
        </Flex>

        <Stack
          ml={5}
          mt={{ base: -19.5, lg: '1rem' }}
          mr={'1rem'}
        >
          <Flex flexDir={'column'} w={'100%'}>
            <Tabs colorScheme='blue' variant={'enclosed'}>
              <TabList
                position={'fixed'}
                mt={{ base: '3rem', lg: '1.5rem' }}
                ml={{ base: '-5', lg: '' }}
                justifyItems={'center'}
                alignItems={'center'}
                w={{ base: '100%', lg: '90%' }}
                flexDir={{ base: 'column', lg: 'row' }}
                zIndex={3}
              >
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Taille de police</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>Langue</Tab>
                <Tab _selected={{ color: 'dark', bg: 'blue.300' }}>À propos</Tab>
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
    </>
  )
}

export default Settings
