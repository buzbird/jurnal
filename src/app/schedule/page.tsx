import React from 'react'

import ScheduleTable from '../components/Modals/schedule/Schedule'

const Schedule = async() => {
  const grouplist = await fetch(process.env.API +"/api/schedule/grouplist",{
        method:'POST',
        body: JSON.stringify({teacher_id: 1}),
    })
    const data = await grouplist.json()
    return (
      <>
      <div>
        <ScheduleTable  data={data} key={1}/>
      </div>
      </>
    )
}

export default Schedule