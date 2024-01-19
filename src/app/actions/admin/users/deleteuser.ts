"use server";

import { deleteUser } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const deleteuser = async(login:string) =>{
    const currentUser  = await deleteUser(login)
}