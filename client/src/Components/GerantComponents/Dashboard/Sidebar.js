import React, { useState } from 'react'
import { Avatar, Divider, Flex, Heading, Link, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import { BsBell, BsFillArchiveFill, BsFillGearFill, BsShop } from 'react-icons/bs'

function Sidebar({ infoUser }) {
  const [navSize] = useState("large")

  return (
    <Flex
      mt={-5}
      overflowY="scroll"
      pos={"fixed"}
      h={'93vh'}
      bg={'blue.700'}
      //boxShadow={"0 4px 12px 0 rgba(0,0,0,0.05)"}
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
          mt={3}
          textColor={useColorModeValue('white')}
          w={navSize === "large" && "100%"}
          _hover={{ textDecor: "none", textColor:'black', backgroundColor: "#AEC8CA" }}
          href='/gerant'
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
          _hover={{ textDecor: "none", textColor:'black', backgroundColor: "#AEC8CA" }}
          href='/gerant/produits'
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
          _hover={{ textDecor: "none", textColor:'black', backgroundColor: "#AEC8CA" }}
          href='/gerant/notifications'
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
          _hover={{ textDecor: "none", textColor:'black', backgroundColor: "#AEC8CA" }}
          href='/gerant/settings'
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
        <Flex mt={4} align={"center"}>
          <Avatar size={"sm"} src={''} />
          <Flex flexDir={"column"} ml={4} display={navSize === "small" ? "none" : "flex"} >
            <Heading as={"h3"} size={"sm"} color={'white'}>{infoUser.userEmail}</Heading>
            <Text color={"gray"}>{infoUser.userProfil}</Text>
          </Flex>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default Sidebar
