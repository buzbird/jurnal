"use server";


export const DeleteAssesment = async(id:any) =>{
    const data  = await fetch(process.env.API +"/api/jurnal/assessment/",{
        method:'DELETE',
        body: JSON.stringify({id: id}),
    })
    const group = await data.json()
    return group
}
export const CreateAssesment = async(number:any,student_id:any,lesson_id:any) =>{
    await fetch(process.env.API +"/api/jurnal/assessment/",{
        method:'POST',
        body: JSON.stringify({number: number,student_id:student_id,lesson_id:lesson_id}),
    })
}