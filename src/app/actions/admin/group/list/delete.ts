"use server";

import {getGroup,deleteGroup} from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const deletegroup = async(id:any) =>{
    const currentUser  = await deleteGroup(id)
}