import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import httpClient from '../../httpClient'

function EditInfoClient() {
  const [email, setEmail] = useState([])
  const [nom, setNom] = useState([])
  const [prenom, setPrenom] = useState([])

  const updateInfo = async () => {
    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/adminLogin", {
        email, nom, prenom
      })
      window.location.href = "/compteClient"
    } catch (error) {
      if (error.response.status === 409) {
        alert("La connexion a échouée. Réessayez plus tard!")
      }
    }
  }

  const annuler = () => {
    window.location.href = "/compteClient"
  }


  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      mt={{ base: "0", lg: "-10" }}
      p={{ base: "1rem", lg: "4rem" }}
    >

      <Flex
        align={'center'} justify={'center'}
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
              <Text fontWeight={'bold'}>Modifier vos informations</Text>
            </Stack>
            <Stack ml={5} p={'1rem'}>

              <Box my={4} textAlign={'left'}>
                <form>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      placeholder='Entrez votre email svp!'
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Nom</FormLabel>
                    <Input
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      type='text'
                      placeholder='Entrez votre nom svp!'
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Prenom</FormLabel>
                    <Input
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      type='text'
                      placeholder='Entrez votre prenom svp!'
                    />
                  </FormControl>
                  <Button
                    onClick={() => updateInfo()}
                    variant={'solid'}
                    colorScheme='teal'
                    width={'full'}
                    mt={4}>
                    Modifier
                  </Button>
                  <Button
                    onClick={() => annuler()}
                    variant={'outline'}
                    colorScheme='red'
                    width={'full'}
                    mt={4}>
                    Annuler
                  </Button>
                </form>
              </Box>
            </Stack>

          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default EditInfoClient
