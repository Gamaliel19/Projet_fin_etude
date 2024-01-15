import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/GerantComponents/Navbar/Navbar';
import Sidebar from '../Components/GerantComponents/Dashboard/Sidebar';
import AuthContext from '../store/authContext';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

function GerantLayoutRoot() {
  const authCtx = useContext(AuthContext)

  const isLoggedIn = authCtx.isLoggedIn

  return (
    <>
      {isLoggedIn && <Box position={'relative'}>
        <Navbar data={authCtx}/>
        <Sidebar  infoUser={authCtx}/>
        <Outlet />
      </Box>}
      {!isLoggedIn && <Flex
        mt={'50vh'}
        align={'center'}
        justify={'center '}
        flexDir={'column'}
      >
        <Text
          textAlign={'center'}
          fontWeight={600}
          fontSize={20}
        >
          Vous n'êtes pas connecté. Veuillez vous connecter!
        </Text>
        <Button
          onClick={(() => window.location.href = '/login')}
          mt={3}
          border={'1px solid teal'}
          colorScheme={'teal'}
          bg={'teal'}
          borderRadius={5}
          p={'0.5rem 2rem'}
        >Se connecter</Button>
      </Flex>}
    </>
  )
}

export default GerantLayoutRoot
