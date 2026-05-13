import * as z from "zod";
   export const regSchema=z.object({
      name:z.string().nonempty("name is required").min(3,"at least 3 character").max(10,"at most 10 character"),
      email:z.string().nonempty("email is required").email("email.format is invalid"),
      password:z.string().nonempty("password is required"),
      rePassword:z.string().nonempty("password is required"),
      dateOfBirth:z.string().nonempty("dateOfBirth is required").refine(data=>{
         let current = new Date().getFullYear();
         let user_date=new Date(data).getFullYear();
         let age= current - user_date
         return age>=18 },"must be older than 18"
      ),
      gender:z.string().nonempty("gender is required")
   }).refine(data=> data.password === data.rePassword,{
      path:["rePassword"],
      message:"password not match"
   })
   
   export const logSchema=z.object({
      email:z.string().nonempty("email is required").email("email.format is invalid"),
      password:z.string().nonempty("password is required"),
   })
   
   export const changePassword = z.object({
      password: z.string().nonempty("current password is required"),

      newPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,"Password must be at least 8 characters and include uppercase, lowercase, number, and special character"),

      confirmNewPassword: z.string().nonempty("confirm password is required"),
   }).refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
   });