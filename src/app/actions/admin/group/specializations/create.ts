"use server";
import { getUser,createSpecialization, getSpecialization } from "@/db/fetch";

export const createspez = async(id:string,name:string) =>{
    const currentSpecialization  = await getSpecialization(id)
    if(currentSpecialization){
        return "0";
    }
    createSpecialization(id,name)
}