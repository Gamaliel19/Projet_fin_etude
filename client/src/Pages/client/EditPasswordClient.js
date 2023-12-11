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

function EditPasswordClient() {
  const [newPassword, setNewPassword] = useState([])
  const [password, setPassword] = useState([])
  const [confirmNewPassword, setConfirmNewPassword] = useState([])

  const annuler = () => {
    window.location.href = "/compteClient"
  }

  const updatePassword = async () => {
    try {
      const resp = await httpClient.post("http://127.0.0.1:5000/adminLogin", {
        newPassword
      })
      window.location.href = "/compteClient"
    } catch (error) {
      if (error.response.status === 409) {
        alert("La connexion a échouée. Réessayez plus tard!")
      }
    }
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
              <Text fontWeight={'bold'}>Modifier votre mot de passe</Text>
            </Stack>
            <Stack ml={5} p={'1rem'}>

              <Box my={4} textAlign={'left'}>
                <form>
                  <FormControl>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                      placeholder='Entrez votre mot de passe actuel svp!'
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type='password'
                      placeholder='Entrez le nouveau mot de passe svp!'
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                    <Input
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      type='password'
                      placeholder='Entrez le nouveau mot de passe svp!'
                    />
                  </FormControl>
                  <Button
                    onClick={() => updatePassword()}
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

export default EditPasswordClient
