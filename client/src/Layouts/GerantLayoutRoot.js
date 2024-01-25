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
    </>
  )
}

export default GerantLayoutRoot
