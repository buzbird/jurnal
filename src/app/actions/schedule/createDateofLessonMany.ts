"use server";
import { revalidatePath } from "next/cache";
import { CreateDateOfLesson,getLessonFromGroup } from "@/db/fetch"
export const  createDateofLessonMany= async(lesson:any,group_id:any) =>{
    try{
        console.log(lesson)
        const lessons = await getLessonFromGroup(group_id)
        let les_id = 0;
        lessons.map((lesson2:any)=>{
            if(lesson.specialization.specialization.lesson_name== lesson2.specialization.specialization.lesson_name){
              les_id = lesson2.id
            }
        })
        console.log(les_id)
        await CreateDateOfLesson(les_id,lesson.lesson_number,lesson.date,lesson.cabinet_number)
        revalidatePath("/schedule")
      }catch(err){
        console.log(err);
      }
    
}