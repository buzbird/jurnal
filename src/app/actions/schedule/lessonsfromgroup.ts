"use server";


export const lessonsfromgroup = async(group_id:any) =>{
    const data  = await fetch(process.env.API +"/api/schedule/lessonsfromgroup/",{
        method:'POST',
        body: JSON.stringify({group_id:group_id}),
    })
    const group = await data.json()
    console.log(group)
    return group
}