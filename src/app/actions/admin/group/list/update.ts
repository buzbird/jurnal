"use server";

import { getGroup, updateGroup } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const updategroup = async(id:any,group_name:any,specialization_id:any,kurator_id:any,kurs:any) =>{
    const group  = await updateGroup(id,group_name,specialization_id,kurator_id,kurs)
}