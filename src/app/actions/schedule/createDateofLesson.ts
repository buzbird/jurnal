"use server";
import { revalidatePath } from "next/cache";
import { CreateDateOfLesson } from "@/db/fetch"
export const  createDateofLesson= async(lesson_id:any,lesson_number:any,date:any,cabinet_number:any) =>{
    try{
        const cab = await CreateDateOfLesson(lesson_id,lesson_number,date,cabinet_number)
        revalidatePath("/schedule")
        return cab
      }catch(err){
        console.log(err);
      }
    
}