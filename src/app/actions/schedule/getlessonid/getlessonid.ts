"use server";
import { revalidatePath } from "next/cache";

export const getLessonId2 = async(group_id:any,lesson_name:any) =>{
    revalidatePath('/schedule')
    const data  = await fetch(process.env.API +"/api/schedule/getLessonid/",{
        method:'POST',
        body: JSON.stringify({group_id:group_id,lesson_name:lesson_name}),
    })
    const lessons = await data.json()
    revalidatePath('/schedule')
    return lessons
}