"use server";

import {getAllTeachers } from "@/db/fetch";

export const getAllTeachers2= async() =>{
    try{
        const data  = await getAllTeachers()
        return data
      }catch(err){
        console.log(err);
      }
}