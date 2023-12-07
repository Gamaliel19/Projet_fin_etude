import { Box, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

function Produit() {
  return (
    <Flex
      flexDir={'column'}
      mt={{ base: '5rem', lg: '10px' }}
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

      <Stack ml={5} align={'flex-start'} mt={5}>
        <Box>
          <Text>
            wertzuiopsdfghjk4
            weerio
          </Text>
        </Box>
      </Stack>

    </Flex>
  )
}

export default Produit
