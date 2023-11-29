import React from 'react'
import { Box, Button, Divider, Flex, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { LogOutIcon } from "@chakra-ui/icons"
import { FaAccessibleIcon, FaShoppingCart, FaStar, FaUserEdit, } from 'react-icons/fa'

function CompteClient() {
  return (
    <Flex
      gap={2}
      flexDirection={{ base: "column", lg: "row" }}
      w={{ base: "100%", lg: "90%" }}
      mx={'auto'}
      h={'60vh'}
      p={'2rem'}
    >
      <Box
        borderTopRightRadius={20}
        boxShadow={'lg'}
        w={{ base: '100%', lg: '50%' }}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Box
          p={'2rem'}
        >
          <Stack align={'center'} direction={'row'}>
            <FaUserEdit fontSize={26} />
            <Text fontWeight={'bold'}>Modifier vos coordonnées</Text>
          </Stack>
          <Stack ml={5} p={'1rem'}>
            <Link>Adresse mail, nom</Link>
            <Divider />
            <Link>Mot de passe</Link>
            <Divider />
            <Link>Adresse de livraison</Link>
            <Divider />
            <Link>Adresse de facturation</Link>
            <Divider />
          </Stack>
        </Box>

      </Box>


      <Box w={{ base: '100%', lg: '50%' }}>

        <Box
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          rounded={10}
          mx={'2'}
          p={'0.5rem'}
        >
          <Button bg={useColorModeValue('white', 'gray.700')} align={'center'} direction={'row'}>
            <FaShoppingCart fontSize={26} />
            <Text fontWeight={'bold'} mx={2}>Suivre vos commandes</Text>
          </Button>
        </Box>
        <Box
          mt={4}
          boxShadow={'lg'}
          rounded={10}
          bg={useColorModeValue('white', 'gray.700')}
          mx={'2'}
          p={'0.5rem'}
        >
          <Button bg={useColorModeValue('white', 'gray.700')} align={'center'} direction={'row'}>
            <FaStar fontSize={26} />
            <Text fontWeight={'bold'} mx={2}>Gérer vos produits favoris</Text>
          </Button>
        </Box>
        <Box
          mt={4}
          boxShadow={'lg'}
          rounded={10}
          bg={useColorModeValue('white', 'gray.700')}
          mx={'2'}
          p={'0.5rem'}
        >
          <Button bg={useColorModeValue('white', 'gray.700')} align={'center'} direction={'row'}>
            <FaAccessibleIcon/>
            <Text fontWeight={'bold'} mx={2}>Cliquez ici pour vous déconnecter</Text>
          </Button>
        </Box>

      </Box>

    </Flex>
  )
}

export default CompteClient
