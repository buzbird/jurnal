"use server";
import { revalidatePath } from "next/cache";

export const getLessonId2 = async(group_id:any,lesson_name:any) =>{
    revalidatePath('/schedule')
    try{
        const data  = await fetch("/api/schedule/getLessonid/",{
            method:'POST',
            body: JSON.stringify({group_id:group_id,lesson_name:lesson_name}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const lessons = await data.json()
      return lessons
      }catch(err){
        console.log(err);
      }
}