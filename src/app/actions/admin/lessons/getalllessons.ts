"use server";

import { getAllLessons } from "@/db/fetch";

export const getAllLesson = async() =>{
    const data  = await  getAllLessons()
    return data
}