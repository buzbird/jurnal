"use server";


export const Getassessmentgroup = async(teacher_id:any,lesson_id:any,group_id:any) =>{
    const data  = await fetch(process.env.API +"/api/jurnal/teacher/group/assessment/",{
        method:'POST',
        body: JSON.stringify({teacher_id: teacher_id,lesson_id:lesson_id,group_id:group_id}),
    })
    const group = await data.json()
    console.log(group)
    return group
}