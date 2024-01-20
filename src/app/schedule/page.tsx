import React from 'react'
import { getGroups } from "@/db/fetch"
import ScheduleTable from '../components/Modals/schedule/Schedule'
const getSchedule = async() =>{
  try{
    const data = await getGroups()
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