"use server";

import { UpdateSpecialization, getSpecialization } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const updatespez = async(id:any,name:any) =>{
    const update  = await getSpecialization(id)
    const currentUser  = await UpdateSpecialization(update?.id,id,name)
}