import React, { useContext, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  Badge,
} from "@heroui/react";
import { CiHome } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { FaGear } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import Cookies from 'js-cookie';

import logo from "../../assets/app_photos/1771039394530-c4f38738-a94d-4d75-93fa-02ec2d0341f4-route-logo.jfif"
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { NotificationContext } from '../../Context/Notifications';
export default function NavbarComponent() {
    const navigate =useNavigate()
    const {count} = useContext(NotificationContext)
    const {setToken ,profileData,setProfileData}=useContext(AuthContext)
    const [active, setActive] = useState("/");

    const navItems = [
      { label: "Feed", icon: <CiHome size={20} />, path: "/" },
      { label: "Profile", icon: <CiUser size={20} />, path: "/profile" },
      { label: "Notifications", icon: <FiMessageCircle size={20} />, path: "/notifications" },
    ];
    

  function handleLogOut(){
    Cookies.remove('userToken');
    navigate("/login");
    setToken(null);
    setProfileData(null);
  }
  return (
    <>
        <Navbar maxWidth='xl' className='border-b border-gray-300'>
        <NavbarBrand className='gap-3'>
          <img src={logo} alt="social_app_logo" width={40} className='rounded-2xl'/>
          <p className="font-bold text-inherit text-xl hidden md:flex">Route Posts</p>
        </NavbarBrand>

        <NavbarBrand>
          <ul className='flex items-center gap-3 bg-gray-100 p-2 rounded-xl'>
            {navItems.map((item, index) => {
              const isActive = active === item.path;

              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      setActive(item.path);
                      navigate(item.path);
                    }}
                    className={`
                      relative flex gap-1 items-center font-bold cursor-pointer px-3 py-2 rounded-lg transition
                      ${isActive ? "bg-white text-blue-600" : "text-gray-700"}
                      hover:bg-white hover:text-black
                    `}
                  >
                      

                    <span className='relative'>
                      {item.label ==="Notifications" && count >0 && <>
                        <div className="absolute w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-sm -top-2 -right-2">
                          {count}
                        </div>
                      </>}
                        
                      {item.icon}
                    </span> <span className='hidden md:flex'>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  isBordered
                  size="sm"
                  src={profileData?.photo}
                />
                <div className="flex items-center gap-2 ">
                  <span className="text-sm font-semibold hidden md:flex">{profileData?.name}</span>
                  <span> <FaBars /> </span>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <div className='flex items-center gap-2' onClick={()=>navigate("/profile")}>
                  <span><CiUser /></span>
                  <span >My Profile</span>
                </div>
              </DropdownItem>
              <DropdownItem key="settings">
                <div className='flex gap-2 items-center' onClick={()=>navigate("/settings")}>
                  <span> <FaGear /> </span>
                  <span>My settings</span>
                </div>
              </DropdownItem>
              
              <DropdownItem key="logout" onClick={()=>handleLogOut()}>
                <hr className='text-gray-300' />
              </DropdownItem>
              
              <DropdownItem key="logout" onClick={()=>handleLogOut()}>
                <span className='text-red-600'> Log Out </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  )
}

