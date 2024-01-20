"use server";


export const DeleteAssesment = async(id:any) =>{
    try{
        const data  = await fetch("/api/jurnal/assessment/",{
            method:'DELETE',
            body: JSON.stringify({id: id}),
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
export const CreateAssesment = async(number:any,student_id:any,lesson_id:any) =>{

    try{
        const data =await fetch(process.env.API +"/api/jurnal/assessment/",{
            method:'POST',
            body: JSON.stringify({number: number,student_id:student_id,lesson_id:lesson_id}),
        })
    
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      }catch(err){
        console.log(err);
      }
}