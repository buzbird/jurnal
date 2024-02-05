"use server";
import { revalidatePath } from "next/cache";
import { CreateDateOfLesson,getLessonFromGroup } from "@/db/fetch"
export const  createDateofLessonMany= async(lesson:any,date:any,group_id:any) =>{
    try{
      console.log(date)
        console.log("--------------------------------------")
        console.log("урок")

        console.log(lesson)
        console.log("--------------------------------------")

        const lessons = await getLessonFromGroup(group_id)
        let les_id = 0;
        lessons.map((lesson2:any)=>{
          console.log("--------------------------------------")
          console.log(lesson2)
          console.log("--------------------------------------")

          console.log(lesson.specialization.specialization.lesson_name== lesson2.specialization.lesson_name)
            if(lesson.specialization.specialization.lesson_name== lesson2.specialization.lesson_name){
              console.log(lesson2.id)
              les_id = lesson2.id
            }
        })
        console.log(les_id)
        await CreateDateOfLesson(les_id,lesson.lesson_number,date,lesson.cabinet_number)
        revalidatePath("/schedule")
      }catch(err){
        console.log(err);
      }
    
}