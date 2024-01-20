"use server";
import { revalidatePath } from "next/cache";

export const  createDateofLesson= async(lesson_id:any,lesson_number:any,date:any,cabinet_number:any) =>{
    try{
        const data  = await fetch(process.env.API +"/api/schedule/createDateOfLesson/",{
            method:'POST',
            body: JSON.stringify({lesson_id:lesson_id,lesson_number:lesson_number,date:date,cabinet_number:cabinet_number,}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
        const cab = await data.json()
        revalidatePath("/schedule")
        return cab
      }catch(err){
        console.log(err);
      }
    
}