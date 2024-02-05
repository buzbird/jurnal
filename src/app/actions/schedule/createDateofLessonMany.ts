"use server";
import { revalidatePath } from "next/cache";
import { CreateDateOfLesson,getLessonFromGroup } from "@/db/fetch"
export const  createDateofLessonMany= async(lesson:any,group_id:any) =>{
    try{
        console.log(lesson)
        const lessons = await getLessonFromGroup(group_id)
        let les_id = 0;
        lessons.map((lesson2:any)=>{
            console.log(lesson2)
            console.log(lesson.specialization.specialization.lesson_name)
        })
        // const cab = await CreateDateOfLesson(lesson_id,lesson_number,date,cabinet_number)
        revalidatePath("/schedule")
        // return cab
      }catch(err){
        console.log(err);
      }
    
}