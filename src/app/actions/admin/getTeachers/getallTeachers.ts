"use server";

import { getUser,createUser } from "@/db/fetch";

export const getAllTeachers= async() =>{
    try{
        const data  = await fetch(process.env.API +"/api/admin/getTeacher",{
            method:'POST',
            body: JSON.stringify({}),
        })
    
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const teachers = await data.json()
    return teachers
      }catch(err){
        console.log(err);
      }
}