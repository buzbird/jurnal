"use server";

import { getUser,createUser } from "@/db/fetch";

export const getAllLessons = async() =>{
    const data  = await fetch(process.env.API +"/api/admin/getLessons",{
        method:'POST',
        body: JSON.stringify({}),
    })
    const groups = await data.json()
    return groups
}