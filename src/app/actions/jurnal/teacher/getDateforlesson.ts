"use server";

import { revalidatePath } from "next/cache";
import { gatelessondatefor } from "@/db/fetch"


export const getDateforlesson = async(lesson_id:any) =>{
    revalidatePath('/teacher')
    try{
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      console.log(startDate,endDate)
      const data = await gatelessondatefor(lesson_id,endDate,startDate)
      return data
      }catch(err){
        console.log(err);
      }
}