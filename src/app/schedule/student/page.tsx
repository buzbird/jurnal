import React from 'react'
import ScheduleStudent from '@/app/components/Modals/schedule/student/Schedule'
const getgrouplist = async() =>{
  try{
    
    const grouplist = await fetch(process.env.API +"/api/schedule/grouplist",{
        method:'POST',
        body: JSON.stringify({teacher_id: 1}),
    })

  if(!grouplist.ok){
    throw new Error(`Error! status: ${grouplist.status}`);
  }
  const data = await grouplist.json()
  return data
  }catch(err){
    console.log(err);
  }
}

const Schedule = async() => {
    const data = await getgrouplist()
    return (
      <>
      <div>
        <ScheduleStudent data={data}/> 
      </div>
      </>
    )
}

export default Schedule