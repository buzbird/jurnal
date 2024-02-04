"use server";
import { revalidatePath } from "next/cache";
import { getLessons,DeleteLessonsSchedule,UpdateLessonsSchedule } from "@/db/fetch"

export const getLessons2 = async(date:any,group_id:any) =>{
    revalidatePath('/api/schedule/getLessons/')
    try{
      const data = await getLessons(date,group_id)
      revalidatePath('/schedule')
      return data
    }catch(err){
        console.log(err);
    }

}
export const UpdateLessons = async(id:any, lesson_number:any, lesson:any, cab:any) =>{
  revalidatePath('/schedule')
  try{
    const data = await UpdateLessonsSchedule(id, lesson_number, lesson,cab)
      revalidatePath('/schedule')
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