"use server";

import { revalidatePath } from "next/cache";


export const getDateforlesson = async(lesson_id:any) =>{
    revalidatePath('/teacher')
    try{
        const json  = await fetch("/api/jurnal/lesson/date",{
            method:'POST',
            body: JSON.stringify({lesson_id:lesson_id}),
        })
      if(!json.ok){
        throw new Error(`Error! status: ${json.status}`);
      }
      const data = await json.json()
      return data
      }catch(err){
        console.log(err);
      }
}