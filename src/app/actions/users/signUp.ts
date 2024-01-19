"use server";

import { getUser,createUser } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const signUp = async(login:string, password: string) =>{
    const currentUser  = await getUser(login)
    if(currentUser){
        return "0";
    }
    const passwordHash = bcrypt.hashSync(password,10);
    createUser(login,login,passwordHash)
    return "Success..."
}