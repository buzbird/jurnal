import React from 'react'

import ScheduleTable from '../components/Modals/schedule/Schedule'
const getSchedule = async() =>{
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
  const data = await getSchedule()
    return (
      <>
      <div>
        <ScheduleTable  data={data} />
      </div>
      </>
    )
}

export default Schedule