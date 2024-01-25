import React, { useState } from 'react'
import {
  Avatar, Divider, Flex, Heading,
  Link, Spacer, Text, useColorModeValue
} from '@chakra-ui/react'
import {
  BsBell, BsFillArchiveFill, BsFillGearFill, BsPeopleFill, BsShop
} from 'react-icons/bs'


function Sidebar({ infoUser }) {

  const [navSize] = useState("large")

  return (
    <>
      <Flex
        mt={-5}
        overflowY="scroll"
        pos={"fixed"}
        h={'93vh'}
        bg={'blue.700'}
        w={"250px"}
        flexDir={"column"}
        display={{ base: "none", lg: "flex" }}
      >

        <Flex
          p={2}
          flexDir={"column"}
          alignItems={navSize === "small" ? "center" : "flex-start"}
          as={"nav"}
        >
          <Link
            textColor={'white'}
            w={navSize === "large" && "100%"}
            mt={4}
            _hover={{ textDecor: "none", textColor: 'black', backgroundColor: "#AEC8CA" }}
            href='/admin'
            borderRadius={5}
          >

            <Flex
              align={'center'}
              flexDir={'row'}
              boxShadow={'lg'}
              p={'0.5rem'}
            >
              <BsShop />
              <Text ml={6}>Ventes</Text>
            </Flex>

          </Link>
          
          <Link
            mt={3}
            textColor={useColorModeValue('white')}
            w={navSize === "large" && "100%"}
            _hover={{ textDecor: "none",textColor: 'black',  backgroundColor: "#AEC8CA" }}
            href='/admin/produits'
            borderRadius={5}

          >
            <Flex
              align={'center'}
              flexDir={'row'}
              boxShadow={'lg'}
              p={'0.5rem'}

            >
              <BsFillArchiveFill />
              <Text ml={6}>Médicaments</Text>
            </Flex>
          </Link>

          <Link
            mt={4}
            textColor={useColorModeValue('white')}
            w={navSize === "large" && "100%"}
            _hover={{ textDecor: "none",textColor: 'black',  backgroundColor: "#AEC8CA" }}
            href='/admin/notifications'
            borderRadius={5}

          >
            <Flex
              align={'center'}
              flexDir={'row'}
              boxShadow={'lg'}
              p={'0.5rem'}

            >
              <BsBell />
              <Text ml={6}>Notifications</Text>
            </Flex>
          </Link>

          <Link
            mt={4}
            textColor={useColorModeValue('white')}
            w={navSize === "large" && "100%"}
            _hover={{ textDecor: "none",textColor: 'black',  backgroundColor: "#AEC8CA" }}
            href='/admin/utilisateurs'
            borderRadius={5}
          >
            <Flex
              align={'center'}
              flexDir={'row'}
              boxShadow={'lg'}
              p={'0.5rem'}

            >
              <BsPeopleFill />
              <Text ml={6}>Gestion des utilisateurs</Text>
            </Flex>
          </Link>

          <Link
            mt={4}
            textColor={useColorModeValue('white')}
            w={navSize === "large" && "100%"}
            _hover={{ textDecor: "none",textColor: 'black',  backgroundColor: "#AEC8CA" }}
            href='/admin/settings'
            borderRadius={5}

          >
            <Flex
              align={'center'}
              flexDir={'row'}
              boxShadow={'lg'}
              p={'0.5rem'}

            >
              <BsFillGearFill />
              <Text ml={6}>Paramètres</Text>
            </Flex>
          </Link>

        </Flex>
        <Spacer />
        <Flex
          p={"5%"}
          flexDir={"column"}
          w={"100%"}
          alignItems={navSize === "small" ? "center" : "flex-start"}
          mb={4}
        >
          <Divider display={navSize === "small" ? "none" : "flex"} />

          <Flex mt={4} align={"center"} justify={'center'}>
            <Avatar size={"sm"} src={'avatar'} />
            <Flex flexDir={"column"} ml={4} display={navSize === "small" ? "none" : "flex"} justify={'center'} align={'flex-start'}>
              <Heading as={"h3"} size={"sm"} color={'white'}>{infoUser.userEmail}</Heading>
              <Text color={"gray"}>{infoUser.userProfil}</Text>
            </Flex>
          </Flex>
        </Flex>

      </Flex>
    </>
  )
}

export default Sidebar
