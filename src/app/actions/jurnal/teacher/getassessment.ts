"use server";


export const Getassessmentgroup = async(teacher_id:any,lesson_id:any,group_id:any) =>{
    try{
        const data  = await fetch(process.env.API +"/api/jurnal/teacher/group/assessment/",{
            method:'POST',
            body: JSON.stringify({teacher_id: teacher_id,lesson_id:lesson_id,group_id:group_id}),
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