"use server";
import { revalidatePath } from "next/cache";

export const getLessons = async(date:any,group_id:any,lesson_number:any) =>{
    revalidatePath('/api/schedule/getLessons/')
    try{
        const data  = await fetch(process.env.API +"/api/schedule/getLessons/",{
            method:'POST',
            body: JSON.stringify({date:date,group_id:group_id,lesson_number:lesson_number}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const lessons = await data.json()
    revalidatePath('/schedule')
    return lessons
      }catch(err){
        console.log(err);
      }

}
export const DeleteLessons = async(id:any) =>{
    revalidatePath('/schedule')
    try{
        const data  = await fetch(process.env.API +"/api/schedule/getLessons/",{
            method:'DELETE',
            body: JSON.stringify({id:id}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
        revalidatePath('/schedule')
      }catch(err){
        console.log(err);
      }
}