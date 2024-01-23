"use server";
import { revalidatePath } from "next/cache";
import { getTeacher2 } from "@/db/fetch"
export const getTeachers = async(date:any) =>{
    revalidatePath("/schedule")
    let teachers2 = {teachers:[{}]};
    try{
        const data = await getTeacher2(date)
        teachers2 = {teachers:data}
        revalidatePath("/schedule")
      }catch(err){
        console.log(err);
      }
    type Lessons =  {
        id: number,
        lesson_number:number,
        lesson_name:string,
        group_name:string,
    }
    type Teachers = {id:number,teacher:string,lessons:Lessons[]}
    let id = -1;
    let teachers: Teachers[] = []
    teachers2.teachers.map((teacher: any) => {
        console.log(teacher.specialization.teacher.user.full_name)
        if(teachers.length == 0){
            teachers = [
                ...teachers,
                {
                    id:id+1,
                    teacher: teacher.specialization.teacher.user.full_name,
                    lessons:[]
                }
            ]
            id= id+1;
            teachers[id].lessons = [
                ...teachers[id].lessons,
                {
                    id: teacher.specialization.id,
                    lesson_number:teacher.lesson_number,
                    lesson_name:teacher.specialization.specialization.lesson_name,
                    group_name:teacher.specialization.group.group_name
                }
            ]
        }else{
            if(teachers[id].teacher == teacher.specialization.teacher.user.full_name){
                teachers[id].lessons = [
                    ...teachers[id].lessons,
                    {
                        id: teacher.specialization.id,
                        lesson_number:teacher.lesson_number,
                        lesson_name:teacher.specialization.specialization.lesson_name,
                        group_name:teacher.specialization.group.group_name
                    }
                ]
            }else{
                teachers = [
                    ...teachers,
                    {
                        id:id+1,
                        teacher: teacher.specialization.teacher.user.full_name,
                        lessons:[]
                    }
                ]
                id= id+1;
                teachers[id].lessons = [
                    ...teachers[id].lessons,
                    {
                        id: teacher.specialization.id,
                        lesson_number:teacher.lesson_number,
                        lesson_name:teacher.specialization.specialization.lesson_name,
                        group_name:teacher.specialization.group.group_name
                    }
                ]
    
            }
        }
      
    })
    // console.log(cabs)
    return teachers
}