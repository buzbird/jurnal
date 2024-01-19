"use server";

import { getUser,createUser } from "@/db/fetch";

export const getAllTeachers= async() =>{
    const data  = await fetch(process.env.API +"/api/admin/getTeacher",{
        method:'POST',
        body: JSON.stringify({}),
    })
    const teachers = await data.json()
    return teachers
}