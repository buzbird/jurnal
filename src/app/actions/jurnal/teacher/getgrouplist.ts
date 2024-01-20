"use server";
import { getGroups } from "@/db/fetch"

export const getgrouplist = async() =>{

    try{
      const data = await getGroups()

      return data
      }catch(err){
        console.log(err);
      }

}