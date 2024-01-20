"use server";
import { revalidatePath } from "next/cache";

export const getcab = async() =>{
    const data  = await fetch(process.env.API +"/api/schedule/getcab/",{
        method:'POST',
        body: JSON.stringify({}),
    })
    const cab = await data.json()
    console.log(cab)
    return cab
}
export const getcab2 = async(date:any) =>{
    revalidatePath("/schedule")
    let cabs1= {cab:[]};
    try{
        const data  = await fetch(process.env.API +"/api/schedule/getcab2/",{
            method:'POST',
            body: JSON.stringify({date:date}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
        revalidatePath("/schedule")
        cabs1 = await data.json()
      }catch(err){
        console.log(err);
      }

    
    type Lessons =  {
        id: number,
        lesson_number:number,
        lesson_name:string,
        group_name:string,
    }
    type cab = {id:number,cabinet:string,lessons:Lessons[]}
    let id = -1;
    let cabs: cab[] = []
    cabs1.cab.map((cabinet: any) => {
        console.log(cabinet)
        if(cabs.length == 0){
            cabs = [
                ...cabs,
                {
                    id:id+1,
                    cabinet: cabinet.cabinet.number,
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
                    group_name:cabinet.specialization.group.group_name
                }
            ]
        }else{
            if(cabs[id].cabinet == cabinet.cabinet.number){
                cabs[id].lessons = [
                    ...cabs[id].lessons,
                    {
                        id: cabinet.specialization.id,
                        lesson_number:cabinet.lesson_number,
                        lesson_name:cabinet.specialization.specialization.lesson_name,
                        group_name:cabinet.specialization.group.group_name
                    }
                ]
            }else{
                cabs = [
                    ...cabs,
                    {
                        id:id+1,
                        cabinet: cabinet.cabinet.number,
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
                        group_name:cabinet.specialization.group.group_name
                    }
                ]
    
            }
        }
      
    })
    console.log(cabs)
    return cabs
}