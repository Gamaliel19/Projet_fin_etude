import React from 'react'
import { Container, Flex, useColorModeValue } from '@chakra-ui/react'

function PanierClient() {
  return (
    <Flex
      flexDir={'column'}
      minHeight={'100vh'}
      bg={useColorModeValue('white', 'gray.700')}
      mt={{ base: "10", lg: "-20" }}
      mx={'auto'}
      p={{ base: '2rem', lg: "4rem" }}
    >
      
    </Flex>
  )
}

export default PanierClient
