"use server";


export const getgrouplist = async() =>{

    try{
        const data  = await fetch(process.env.API +"/api/schedule/grouplist",{
            method:'POST',
            body: JSON.stringify({}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const groups = await data.json()
      return groups
      }catch(err){
        console.log(err);
      }

}