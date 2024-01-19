"use server";
import { revalidatePath } from "next/cache";

export const getLessonfromDate = async(date:any,group_id:any) =>{
    revalidatePath("/api/schedule/getLessonfromDate/")
    const data  = await fetch(process.env.API +"/api/schedule/getLessonfromDate/",{
        method:'POST',
        body: JSON.stringify({date:date,group_id:group_id}),
    })
    const group = await data.json()
    console.log(group)
    revalidatePath("/schedule/student/")
    return group
}