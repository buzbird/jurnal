"use server";


export const getgrouplist = async() =>{
    const data  = await fetch(process.env.API +"/api/schedule/grouplist",{
        method:'POST',
        body: JSON.stringify({}),
    })
    const groups = await data.json()
    return groups
}