import React, { useEffect, useState } from 'react'
import { Card, CardBody, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa'


let id

export const SingleVente = () => {
  id = useParams().id
  const [vente, setVente] = useState([])
  const Retourner = () => {
    window.location.href = '/admin'
  }

  useEffect(() => {
    axios.get('http://localhost:5000/listSingleVente/' + id)
      .then(res => {
        setVente(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(vente)

  return (
    <>

      <IconButton
        onClick={() => Retourner()}
        bg={'transparent'}
        _hover={{ bg: 'blue.700', color: 'white' }}
        left={{ base: '1.5rem', lg: '16rem}' }}
        m={'0.5rem 2rem'}
        icon={<FaArrowLeft />}
      />
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        w={{ base: '100%', lg: '60%', xl: '60%' }}
        ml={{ base: '', lg: '30%', xl: '30%' }}
        mt={'10%'}
        justify={'space-between'}
        align={'center'}
      >
        <Flex align={'center'} justify={'center'}>
          <Card
            w={{ base: 'xs', lg: 'xs' }}
            h={'20rem'}
            position={'relative'}
            m={'0.5rem'}
          >
            <CardBody>
              <Image
                src={''}
                alt={""}
                borderRadius='md'
              />
            </CardBody>
          </Card>
        </Flex>
        <Flex
          align={'flex-start'}
          justify={'center'}
          flexDir={'column'}
          boxShadow={'md'}
          borderRadius={5}
          w={{ base: 'xs', lg: 'md' }}
          h={'20rem'}
          p={'0rem 2rem'}
        >
          <Stack>
            <Heading fontSize={'xl'}>Vendeur: {vente.email}</Heading>
            <Text fontSize={'lg'}>Designation: {vente.designation}</Text>
            <Text fontSize={'lg'}>Dosage: {vente.dose}</Text>
            <Text fontSize={'lg'}>Prix: {vente.prix_unit}FCFA</Text>
            <Text fontSize={'lg'}>Quantité: {vente.qte}</Text>
            <Text fontSize={'lg'}>Prix total: {vente.prix_total}FCFA</Text>
          </Stack>
          <Stack
            flexDir={'row'}
            align={'flex-end'}
          >
            <Link to={`/admin/editVente/${id}`}>
              <IconButton
                icon={<FaEdit />}
                color={'green'}
              />
            </Link>
            <IconButton
              ml={2}
              icon={<FaTrash color={'red'} />}
              onClick={e => deleteVente(id)}
            />
          </Stack>
        </Flex>
      </Flex>
    </>
  )
  function deleteVente(id) {
    const conf = window.confirm(" Attention! Voulez-vous vraiment supprimer cette vente?")
    if (conf) {
      axios.delete('http://localhost:5000/deleteVente/' + id)
        .then(res => {
          alert('Cette vente a été supprimée avec succès!')
          window.location.href = '/admin'
        }).catch(err => console.log(err))
    }
  }
}
