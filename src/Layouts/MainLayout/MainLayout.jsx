import React from 'react'
import Footer from '../../Component/Footer/Footer.jsx'
import NavbarComponent from '../../Component/Navbar/NavbarComponent.jsx'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  )
}
