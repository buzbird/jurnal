"use server";
import { revalidatePath } from "next/cache";
import { getCab,getGroup2 } from "@/db/fetch"


export const getgroup = async(date:any) =>{
    revalidatePath("/schedule")
    let cabs1= {cab:[{}]};
    try{
        const cab = await getGroup2(date)
        cabs1 = {cab:cab}
        revalidatePath("/schedule")
      }catch(err){
        console.log(err);
      }

    
    type Lessons =  {
        id: number,
        lesson_number:number,
        lesson_name:string,
        cabinet:string,
    }
    type cab = {id:number,group:string,lessons:Lessons[]}
    let id = -1;
    let cabs: cab[] = []
    cabs1.cab.map((cabinet: any) => {
        console.log(cabinet)
        if(cabs.length == 0){
            cabs = [
                ...cabs,
                {
                    id:id+1,
                    group: cabinet.specialization.group.group_name,
                    lessons:[]
                }
            ]
            id= id+1;
            cabs[id].lessons = [
                ...cabs[id].lessons,
                {
                    id: cabinet.specialization.id,
                    lesson_number:cabinet.lesson_number,
                    lesson_name:cabinet.specialization.specialization.lesson_name,
                    cabinet:cabinet.cabinet.number
                }
            ]
        }else{
            if(cabs[id].group == cabinet.specialization.group.group_name){
                cabs[id].lessons = [
                    ...cabs[id].lessons,
                    {
                        id: cabinet.specialization.id,
                        lesson_number:cabinet.lesson_number,
                        lesson_name:cabinet.specialization.specialization.lesson_name,
                        cabinet:cabinet.cabinet.number
                    }
                ]
            }else{
                cabs = [
                    ...cabs,
                    {
                        id:id+1,
                        group: cabinet.specialization.group.group_name,
                        lessons:[]
                    }
                ]
                id= id+1;
                cabs[id].lessons = [
                    ...cabs[id].lessons,
                    {
                        id: cabinet.specialization.id,
                        lesson_number:cabinet.lesson_number,
                        lesson_name:cabinet.specialization.specialization.lesson_name,
                        cabinet: cabinet.cabinet.number
                    }
                ]
    
            }
        }
      
    })
    console.log(cabs)
    return cabs
}