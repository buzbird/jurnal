"use server";
import { revalidatePath } from "next/cache";

export const getLessonsTeachers = async(date:any,teacher_id:any) =>{
    revalidatePath('/schedule/teacher')
    const data  = await fetch("/api/jurnal/lesson/date/teacher/",{
        method:'POST',
        body: JSON.stringify({date:date,teacher_id:teacher_id}),
    })
    const lessons = await data.json()
    revalidatePath('/schedule/teacher')
    return lessons
}