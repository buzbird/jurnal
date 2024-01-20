"use server";


export const lessonsfromgroup = async(group_id:any) =>{
    try{
        const data  = await fetch(process.env.API +"/api/schedule/lessonsfromgroup/",{
            method:'POST',
            body: JSON.stringify({group_id:group_id}),
        })
      if(!data.ok){
        throw new Error(`Error! status: ${data.status}`);
      }
      const group = await data.json()
      return group
      }catch(err){
        console.log(err);
      }
}