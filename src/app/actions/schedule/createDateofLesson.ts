"use server";
import { revalidatePath } from "next/cache";

export const  createDateofLesson= async(lesson_id:any,lesson_number:any,date:any,cabinet_number:any) =>{
    console.log(lesson_id,lesson_number,date,cabinet_number)
    const data  = await fetch(process.env.API +"/api/schedule/createDateOfLesson/",{
        method:'POST',
        body: JSON.stringify({lesson_id:lesson_id,lesson_number:lesson_number,date:date,cabinet_number:cabinet_number,}),
    })
    const cab = await data.json()
    console.log(cab)
    revalidatePath("/schedule")
    return cab
}