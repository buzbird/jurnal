"use server";

import { group } from "console";


export const getgrouplist = async(teacher_id:any,lesson_id:any) =>{
    try{
        const data  = await fetch(process.env.API +"/api/jurnal/teacher/group/list",{
            method:'POST',
            body: JSON.stringify({teacher_id: teacher_id,lesson_id:lesson_id}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const groups = await data.json()
      return {groups}
      }catch(err){
        console.log(err);
      }
    return {groups:[]}
}