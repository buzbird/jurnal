"use server";


export const Getassessmentstudent = async(student_id:any,date_id:any) =>{
    const data  = await fetch(process.env.API +"/api/jurnal/teacher/student/assessment/",{
        method:'POST',
        body: JSON.stringify({student_id: student_id,date_id:date_id}),
    })
    const group = await data.json()
    return group
}