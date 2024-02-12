"use server";
import { revalidatePath } from "next/cache";
import { gatelessondateforteacher } from "@/db/fetch"

export const getLessonsTeachers = async(date:any,teacher_id:any) =>{
    revalidatePath('/schedule/teacher')
    const data = await gatelessondateforteacher(date,teacher_id)
    console.log(data)
    revalidatePath('/schedule/teacher')
    return data
}