import React, { useContext, useState } from 'react'
import {Input} from "@heroui/input";
import {DatePicker} from "@heroui/date-picker";
import {Select, SelectItem} from "@heroui/react";
import {Button, ButtonGroup} from "@heroui/button";
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { logSchema } from '../../../Liberary/ValidationSchema/AuthnticationSchema';
import {userLogin} from '../../../services/AuthServicies.js'
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext.jsx';
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import Cookies from "js-cookie";
// #################################################################################
  // khaled@mailinator.com

  // #################################################################################

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  let {register , handleSubmit , formState:{errors , isSubmitting}}=useForm({
    mode:"onChange",
    resolver:zodResolver(logSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  })

  const navigate = useNavigate();

  let {setToken} = useContext(AuthContext)

async function handleUserLogin(data) {
  try {
    const response = await userLogin(data);
    Cookies.set("userToken", response.data.data.token, {
        expires: 7,
        sameSite: "strict"
    });
    setToken(response.data.data.token);
    toast.success(response.data.message)
    navigate("/");
  } catch (error) {
    toast.error(error.response?.data.message)
  }


}

  return (
    <>
    <div className='px-7'>
      <form className=' w-full my-3' onSubmit={handleSubmit(handleUserLogin)}>
        <div className='mb-2'>
          <h2 className='text-xl font-extrabold '>Log in to Route Posts </h2>
          <p className=' text-md fw-bold text-gray-600'>Log in and continue your social journey.</p>
        </div>
        <div className='my-4'>
          <Input
            size="lg" 
            placeholder="Email or UserName" 
            isInvalid={errors.email} 
            errorMessage={errors.email?.message} 
            {...register("email")} 
            variant='bordered' 
            className='pb-4'
            startContent={<CiUser />}
          />
          <Input
            size="lg"
            isInvalid={errors.password}
            errorMessage={errors.password?.message} 
            {...register("password")}  
            placeholder="Password" 
            type={showPassword?"text":"password"} 
            variant='bordered' 
            className='pb-4'
            startContent={<IoKeyOutline />}
            endContent={
              showPassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/> : <IoEyeSharp className='text-3xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)} />
            } 
          />

          <Button isLoading={isSubmitting} type='submit' color= {isSubmitting ? "default" : "primary"} className=' bg-blue-800 font-bold text-md w-full '>
            Login
          </Button>
        </div>
      </form>
    </div>

    </>
  )
}
