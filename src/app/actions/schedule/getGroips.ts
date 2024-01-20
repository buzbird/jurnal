"use server";
import { revalidatePath } from "next/cache";

export const getAllGroup = async() =>{
   
    try{
        const grouplist = await fetch(process.env.API +"/api/schedule/grouplist",{
            method:'POST',
            body: JSON.stringify({teacher_id: 1}),
        })
      if(!grouplist.ok){
        throw new Error(`Error! status: ${grouplist.status}`);
      }
      const data = await grouplist.json()
      revalidatePath("/schedule")
      revalidatePath("/api/schedule/grouplist")
      return data

      }catch(err){
        console.log(err);
      }
    

    
}