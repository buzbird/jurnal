"use server";
import { TeachersGroupList } from "@/db/fetch";


export const getgrouplist = async(teacher_id:any,lesson_id:any) =>{
    try{
      const data =  await TeachersGroupList(teacher_id,lesson_id)
      return data
      }catch(err){
        console.log(err);
      }
}