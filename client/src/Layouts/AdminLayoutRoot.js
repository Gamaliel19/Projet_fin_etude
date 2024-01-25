import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/AdminComponents/Navbar/Navbar';
import Sidebar from '../Components/AdminComponents/Dashboard/Sidebar';
import { Box } from '@chakra-ui/react';
import AuthContext from '../store/authContext';

function AdminLayoutRoot() {

  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn

  return (
    <>
      {isLoggedIn && <Box>
        <Navbar data={authCtx} />
        <Sidebar infoUser={authCtx} />
        <Outlet />
      </Box>}
    </>
  )
}

export default AdminLayoutRoot
