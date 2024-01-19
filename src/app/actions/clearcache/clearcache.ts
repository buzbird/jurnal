"use server";
import { revalidatePath } from "next/cache";

export const Clearcache = async(url:any) =>{
    revalidatePath(url)
}