"use server";
import { revalidatePath } from "next/cache";
import { getLessons,DeleteLessonsSchedule } from "@/db/fetch"

export const getLessons2 = async(date:any,group_id:any,lesson_number:any) =>{
    revalidatePath('/api/schedule/getLessons/')
    try{
      const data = await getLessons(date,group_id,lesson_number)
      revalidatePath('/schedule')
      return data
    }catch(err){
        console.log(err);
    }

}
export const DeleteLessons = async(id:any) =>{
    revalidatePath('/schedule')
    try{
      const data = await DeleteLessonsSchedule(id)
        revalidatePath('/schedule')
      }catch(err){
        console.log(err);
      }
}