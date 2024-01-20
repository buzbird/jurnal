"use server";
import { revalidatePath } from "next/cache";
import { getLessonFromDate } from "@/db/fetch"
export const getLessonfromDate = async(date:any,group_id:any) =>{
    revalidatePath("/api/schedule/getLessonfromDate/")
    try{
      const data = await getLessonFromDate(date,group_id)
      revalidatePath("/schedule")
      revalidatePath("/api/schedule/grouplist")
      revalidatePath("/schedule/student/")
      return data
      }catch(err){
        console.log(err);
      }
}