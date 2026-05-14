import { Button, Input } from '@heroui/react';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { IoKeyOutline } from "react-icons/io5";
import { changePassword } from '../../Liberary/ValidationSchema/AuthnticationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePassword } from '../../services/AuthServicies';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

export default function Settings() {
    let {register , handleSubmit , formState:{errors , isSubmitting}}=useForm({
        mode:"onChange",
        resolver:zodResolver(changePassword),
        defaultValues:{
            password: "",
            newPassword:""
        }
    })
    let {setToken} = useContext(AuthContext)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function handleSubmitChange(data){
        try{
            const body = {
                password: data.password,
                newPassword: data.newPassword
            }
            const response = await updatePassword(body);
            localStorage.setItem("userToken",response.data.data.token);
            setToken(response.data.data.token);
            toast.success(response.data.message)
        }catch(error){
            console.log(error)
            toast.error(error.response?.data.error)
        }
    }
    return (
    <>
        <div className='border-1 border-gray-300 rounded-xl p-4 shadow-md max-w-[650px] mx-auto space-y-4'>
            <div className='flex items-center gap-3 '>
                <div className='bg-blue-300 rounded-xl p-2'>
                    <IoKeyOutline className='text-blue-500 text-lg' />
                </div>
                <div>
                    <h1 className='font-bold text-3xl'>Change Password</h1>
                    <p className='text-gray-400'>Keep your account secure by using a strong password.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmitChange)}>
                <div className='space-y-4'>
                    <div>
                        <h2 className='mb-2 text-xl font-bold'>Current password</h2>
                        <div>
                            <Input
                                {...register( "password" )}
                                placeholder="Enter Current Password" 
                                className="rounded-xl"
                                isInvalid={errors.password}
                                errorMessage={errors.password?.message}
                                variant="bordered"
                                type={showCurrentPassword ? "text" : "password"}
                                endContent={
                                    showCurrentPassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowCurrentPassword(!showCurrentPassword)}/> : <FaEye className='text-3xl cursor-pointer' onClick={()=>setShowCurrentPassword(!showCurrentPassword)} />
                                }    
                            />
                                
                        </div>
                    </div>
                    <div>
                        <h2 className='mb-2 text-xl font-bold'>New password</h2>
                        <div>
                            <Input
                                {...register( "newPassword" )}
                                placeholder="Enter New Password" 
                                className="rounded-xl"
                                isInvalid={errors.newPassword}
                                errorMessage={errors.newPassword?.message}
                                variant="bordered"
                                type={showNewPassword ? "text" : "password"}
                                endContent={
                                    showNewPassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowNewPassword(!showNewPassword)}/> : <FaEye className='text-3xl cursor-pointer' onClick={()=>setShowNewPassword(!showNewPassword)} />
                                }
                            />
                        </div>
                        <p className='text-sm text-gray-400'>At least 8 characters with uppercase, lowercase, number, and special character.</p>
                    </div>
                    <div>
                        <h2 className='mb-2 text-xl font-bold'>Confirm New password</h2>
                        <div >
                            <Input
                                {...register( "confirmNewPassword" )}
                                placeholder="Re-enter New Password" 
                                variant="bordered"
                                isInvalid={errors.confirmNewPassword}
                                errorMessage={errors.confirmNewPassword?.message}
                                type={showConfirmPassword ? "text" : "password"} 
                                endContent={
                                    showConfirmPassword ? <IoIosEyeOff className='text-3xl cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/> : <FaEye className='text-3xl cursor-pointer' onClick={()=>setShowConfirmPassword(!showConfirmPassword)} />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className='my-4'>
                    <Button type='submit' isLoading={isSubmitting} color= {isSubmitting ? "default" : "primary"} className="w-full bg-blue-400 text-white">
                        {isSubmitting ? "updating password ..." : "Update password " } 
                    </Button>
                </div>
            </form>
        </div>
    </>
  )
}
