"use server";

import { revalidatePath } from "next/cache";


export const getDateforlesson = async(lesson_id:any) =>{
    revalidatePath('/teacher')
    const json  = await fetch(process.env.API +"/api/jurnal/lesson/date",{
        method:'POST',
        body: JSON.stringify({lesson_id:lesson_id}),
    })
    console.log(lesson_id)
    const data = await json.json()
    console.log(data)
    return data
}