"use server";
import { getLessonFromGroup } from "@/db/fetch"

export const lessonsfromgroup = async(group_id:any) =>{
  const data = await getLessonFromGroup(group_id)
  console.log(data)
  return data
}