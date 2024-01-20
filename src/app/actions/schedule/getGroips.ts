"use server";
import { revalidatePath } from "next/cache";
import { getGroups } from "@/db/fetch"

export const getAllGroup = async() =>{
    try{
      const data = await getGroups()
      revalidatePath("/schedule")
      revalidatePath("/api/schedule/grouplist")
      return data

      }catch(err){
        console.log(err);
      }
}