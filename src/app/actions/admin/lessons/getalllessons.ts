"use server";

import { getUser,createUser } from "@/db/fetch";

export const getAllLessons = async() =>{
    try{
    
        const data = await fetch(process.env.API +"/api/admin/getLessons",{
            method:'POST',
            body: JSON.stringify({teacher_id: 1}),
        })
    
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const groups = await data.json()
      return groups
      }catch(err){
        console.log(err);
      }

}