"use server";
import { revalidatePath } from "next/cache";

export const getLessonfromDate = async(date:any,group_id:any) =>{
    revalidatePath("/api/schedule/getLessonfromDate/")
    try{
        const data  = await fetch("/api/schedule/getLessonfromDate/",{
            method:'POST',
            body: JSON.stringify({date:date,group_id:group_id}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const group = await data.json()
      revalidatePath("/schedule")
      revalidatePath("/api/schedule/grouplist")
      revalidatePath("/schedule/student/")
        return group
      }catch(err){
        console.log(err);
      }
}