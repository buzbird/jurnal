"use server";
import { getGroup,createGroup } from "@/db/fetch";

export const creategroup = async(group_name:any,specialization_id:any,kurator_id:any,kurs:any,is_y:any) =>{
    const currentSpecialization  = await getGroup(group_name)
    
    if(currentSpecialization){
        return "0";
    }
    createGroup(group_name,specialization_id,kurator_id,kurs,is_y)
}