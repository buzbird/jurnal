"use server";

import { DeleteSpecialization,getSpecialization } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const deletespez = async(id:string) =>{
    const del  = await getSpecialization(id)
    const currentUser  = await DeleteSpecialization(del?.id)
}