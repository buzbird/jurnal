"use server";
import { revalidatePath } from "next/cache";
import { getLessonId } from "@/db/fetch"
export const getLessonId2 = async(group_id:any,lesson_name:any) =>{
    revalidatePath('/schedule')
    try{
      const data = await getLessonId(group_id,lesson_name)
      return data
      }catch(err){
        console.log(err);
      }
}