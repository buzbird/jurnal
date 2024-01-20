"use server";
import { getLessonFromGroup } from "@/db/fetch"

export const lessonsfromgroup = async(group_id:any) =>{
    try{
      const data = await getLessonFromGroup(group_id)
      return data
      }catch(err){
        console.log(err);
    }
}