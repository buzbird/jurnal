"use server";


export const Getassessmentstudent = async(student_id:any,date_id:any) =>{
    try{
        const data  = await fetch("/api/jurnal/teacher/student/assessment/",{
            method:'POST',
            body: JSON.stringify({student_id: student_id,date_id:date_id}),
        })
    
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const group = await data.json()
      return group
      }catch(err){
        console.log(err);
      }
}