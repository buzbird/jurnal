"use server";

import { deleteAssesment,CreateAssesment} from "@/db/fetch"

export const DeleteAssesment = async(id:any) =>{
    try{
      const data = await deleteAssesment(id)
      return data
      }catch(err){
        console.log(err);
      }
}
export const CreateAssesment2 = async(number:any,student_id:any,lesson_id:any) =>{
    try{
      const data = await CreateAssesment(number,student_id, lesson_id)
      }catch(err){
        console.log(err);
      }
}