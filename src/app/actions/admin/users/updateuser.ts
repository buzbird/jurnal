"use server";

import { updateUser } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const updateuser = async(login:string,newlogin:any,full_name:string, password: string) =>{
    
    const passwordHash = bcrypt.hashSync(password,10);
    const currentUser  = await updateUser(login,newlogin,full_name,passwordHash)
}