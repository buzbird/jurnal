"use server";
import { revalidatePath } from "next/cache";
export const getTeachers = async(date:any) =>{
    revalidatePath("/schedule")
    const data  = await fetch(process.env.API +"/api/schedule/getTeachers/",{
        method:'POST',
        body: JSON.stringify({date:date}),
    })
    const teachers2 = await data.json()
    console.log("-------------------------------")
    console.log(teachers2)
    console.log("-------------------------------")
    type Lessons =  {
        id: number,
        lesson_number:number,
        lesson_name:string,
        group_name:string,
    }
    type teachers = {id:number,teacher:string,lessons:Lessons[]}
    let id = -1;
    let teachers: teachers[] = []
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