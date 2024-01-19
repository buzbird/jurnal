"use server";

import { getUser,createUser } from "@/db/fetch";
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";

export const createuser = async(login:string,full_name:string, password: string) =>{
    revalidatePath('/admin/users')
    const currentUser  = await getUser(login)
    if(currentUser){
        return "0";
    }
    const passwordHash = bcrypt.hashSync(password,10);
    createUser(login,full_name,passwordHash)
}