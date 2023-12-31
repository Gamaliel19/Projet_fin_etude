import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import httpClient from '../../httpClient'

function CreationCompte() {
  const [email, setEmail] = useState([])
  const [nom, setNom] = useState([])
  const [prenom,setPrenom] = useState([])
  const [profil,setProfil] = useState([])
  const [password, setPassword] = useState([])
  const [confirmPassword, setConfirmPassword] = useState([])
  
  const regisInUser = async () => {

    try {
        const resp = await httpClient.post("http://127.0.0.1:5000/registerUser", {
            email,
            nom,
            prenom,
            profil,
            password,
            confirmPassword
        });
        window.location.href = "/compteClient"
    } catch (e) {
        if (e.response.status === 409) {
            alert("La connexion a échouée. Réessayez plus tard!")
        }
    }

};

  return (
    <Flex
      flexDir={'column'}
      align={'center'}
      bg={useColorModeValue('white', 'gray.700')}
      mt={{ base: "6", lg: "-20" }}
      p={{ base: "1rem", lg: "4rem" }}
      mx={'auto'}
    >
      <Box w={{ base: "100%", lg: "50%" }}>
        <Heading>Je suis un nouveau client</Heading>
        <Stack align={'center'} direction={'row'}>
          <Text fontWeight={'bold'}>Créer votre espace client et avoir accès au suivi et à l'historique de mes commandes.</Text>
        </Stack>
        <Stack align={'center'} direction={'row'}>
          <Text>Veuillez bien remplir tous les champs de saisie.</Text>
        </Stack>

        <Stack

        >
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={5}
            spacing={8}
            maxW={'lg'}
          >
            <Stack spacing={4}>
              <FormControl id="email">
              <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="green.400"
                  placeholder='Entrez votre email svp!' />
              </FormControl>
              <FormControl id="nom">
              <FormLabel>Nom</FormLabel>
                <Input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  focusBorderColor="green.400"
                  placeholder='Entrez votre nom svp! ' />
              </FormControl>
              <FormControl id="prenom">
              <FormLabel>Prenom</FormLabel>
                <Input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  focusBorderColor="green.400"
                  placeholder='Entrez votre prenom svp! ' />
              </FormControl>
              <FormControl id={'profil'}>
                    <FormLabel>Profil</FormLabel>
                    <Select
                        placeholder='Choisir votre profil'
                        value={profil}
                        onChange={(e) => setProfil(e.target.value)}
                    >
                        <option value={'client'}>Client</option>
                    </Select>
                </FormControl>
              <FormControl id="password">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Entrez votre mot de passe svp!'
                  focusBorderColor="green.400"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  onClick={() =>regisInUser()}
                  _hover={{
                    bg: 'green.500',
                  }}>
                  Connexion
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  )
}

export default CreationCompte
