import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/AdminComponents/Navbar/Navbar';
import Sidebar from '../Components/AdminComponents/Dashboard/Sidebar';

function AdminLayoutRoot() {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <Outlet />
    </div>
  )
}

export default AdminLayoutRoot
