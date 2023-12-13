import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/GerantComponents/Navbar/Navbar';
import Sidebar from '../Components/GerantComponents/Dashboard/Sidebar';

function GerantLayoutRoot() {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <Outlet />
    </div>
  )
}

export default GerantLayoutRoot
