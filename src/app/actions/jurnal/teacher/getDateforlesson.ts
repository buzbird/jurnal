"use server";

import { revalidatePath } from "next/cache";
import { gatelessondatefor } from "@/db/fetch"


export const getDateforlesson = async(lesson_id:any,date2:any) =>{
    revalidatePath('/teacher')
    try{
      const date = new Date(date2);
      const year = date.getFullYear();
      const month = date.getMonth();
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      console.log(startDate,endDate)
      const data = await gatelessondatefor(lesson_id,endDate,startDate)
      console.log("------------------")
      console.log("data")
      console.log(data)
      console.log("------------------")
      return data
      }catch(err){
        console.log(err);
      }
}