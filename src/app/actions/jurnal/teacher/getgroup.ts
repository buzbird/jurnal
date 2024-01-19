"use server";


export const getgrouplist = async(teacher_id:any,lesson_id:any) =>{
    const data  = await fetch(process.env.API +"/api/jurnal/teacher/group/list",{
        method:'POST',
        body: JSON.stringify({teacher_id: teacher_id,lesson_id:lesson_id}),
    })
    const groups = await data.json()
    return {groups}
}