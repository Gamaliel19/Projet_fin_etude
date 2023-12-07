import React from 'react'
import { Flex } from '@chakra-ui/react'

function Cat() {
  return (
    <Flex
      mt={{ base: '5rem', lg: '1rem' }}
      ml={{ base: 1, lg: 80 }}
      bg={'yellow'}
    >
      Catégories
    </Flex>
  )
}

export default Cat
