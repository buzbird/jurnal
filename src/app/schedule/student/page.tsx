import React from 'react'


import ScheduleStudent from '@/app/components/Modals/schedule/student/Schedule'
import { getAllGroup } from '@/app/actions/schedule/getGroips'
const getgrouplist = async() =>{
  try{
    
    const data = await getAllGroup()
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