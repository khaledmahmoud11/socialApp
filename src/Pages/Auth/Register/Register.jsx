import React, { useContext, useState } from 'react'
import {Input} from "@heroui/input";
import {DatePicker} from "@heroui/date-picker";
import {Select, SelectItem} from "@heroui/react";
import {Button, ButtonGroup} from "@heroui/button";
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { regSchema } from '../../../Liberary/ValidationSchema/AuthnticationSchema';
import {userRegister} from '../../../services/AuthServicies.js'
import { IoEyeSharp } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdAlternateEmail } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { AuthContext } from '../../../Context/AuthContext.jsx';
import Cookies from "js-cookie";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepassword, setShowRepassword] = useState(false)
  let {register , handleSubmit , formState:{errors , isSubmitting}}=useForm({
    mode:"onChange",
    resolver:zodResolver(regSchema),
    defaultValues:{
      name: "",
      email:"",
      password:"",
      rePassword:"",
      dateOfBirth:"",
      gender:""
    }
  })

  let {setToken} = useContext(AuthContext)


  async function getData(data) {
  try {

    const response = await userRegister(data);
    toast.success(response.data.message)
    localStorage.setItem("userToken",response.data.data.token);
    Cookies.set("userToken", response.data.data.token, {
            expires: 7,
            sameSite: "strict"
        });
    setToken(response.data.data.token);
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

  return (
    <>
      <form className='px-7' onSubmit={handleSubmit(getData)}>
        <div className='mb-2'>
          <h2 className='text-2xl font-extrabold '>Create a new account</h2>
          <p className=' text-md fw-bold text-gray-600'>It is quick and easy.</p>
        </div>

      <div>
        <Input
          size="lg"
          isInvalid={errors.name}
          errorMessage={errors.name?.message} 
          {...register( "name" )} 
          placeholder="Full Name"
          type="text" variant='bordered' 
          className='pb-4'
          startContent={<CiUser />}          
        />

        <Input
          size="lg"
          isInvalid={errors.email} 
          errorMessage={errors.email?.message} 
          {...register("email")} 
          placeholder="Email Address" 
          variant='bordered' 
          className='pb-4'
          startContent={<MdAlternateEmail />}
        />

        <Input 
          size="lg"
          placeholder="User Name" 
          variant='bordered' 
          className='pb-4'
          startContent={<MdAlternateEmail />}
        />
        
        <Select
            size='lg' 
            isInvalid={errors.gender} 
            errorMessage={errors.gender?.message} 
            {...register("gender")} 

            placeholder='Select Your Gender' 
            variant='bordered' 
            className='pb-4'
            startContent={<LuUsers />}
          >
          <SelectItem key="male" >Male</SelectItem>
          <SelectItem key="female" >FeMale</SelectItem>
        </Select>
          
        <Input
          size='lg' 
          isInvalid={errors.dateOfBirth} 
          errorMessage={errors.dateOfBirth?.message} 
          {...register("dateOfBirth")} 
          type="date"  
          variant='bordered' 
          className='pb-4'
          startContent={<CiCalendar />}  
        />
        
        <Input 
          size="lg"
          isInvalid={errors.password} 
          errorMessage={errors.password?.message} 
          {...register("password")}  
          placeholder="Password" 
          type={showPassword?"text":"password"} 
          variant='bordered' className='pb-4'
          endContent={
            showPassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)}/> : <IoEyeSharp className='text-3xl cursor-pointer' onClick={()=>setShowPassword(!showPassword)} />
          } 
          startContent={<IoKeyOutline />}
        />
        
        <Input
          size="lg" 
          isInvalid={errors.rePassword} 
          errorMessage={errors.rePassword?.message} 
          {...register("rePassword")} 
          placeholder="Confirm Password"
          type={showRepassword?"text":"password"} 
          variant='bordered' 
          className='pb-4'
          endContent={
            showRepassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowRepassword(!showRepassword)}/> : <IoEyeSharp className='text-3xl cursor-pointer' onClick={()=>setShowRepassword(!showRepassword)} />
          }
          startContent={<IoKeyOutline />} 
        />


          <Button type='submit' color= {isSubmitting ? "default" : "primary"} className='w-full bg-blue-800 py-6 text-md font-bold'>
            {isSubmitting ? "Please Wait ..." : "Create new Account " }
          </Button>
        
        </div>
      </form>

    </>
  )
}
