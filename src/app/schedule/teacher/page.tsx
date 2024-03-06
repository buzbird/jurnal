import React from 'react'
import { getServerSession } from 'next-auth';
import ScheduleTeacher from '@/app/components/Modals/schedule/teacher/Schedule'
import { getUser,getTeacher,getKurator,getKuratorinGroup } from '@/db/fetch'
import { authOptions } from '@/app/utils/authOptions'

const getUserTeacher= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetTeacher= async(user_id:any) =>{
  const teacher = await getTeacher(user_id)
  return teacher
}
const GetKurator= async(user_id:any) =>{
  const teacher = await getKurator(user_id)
  return teacher
}
const getGroup= async(kurator:any) =>{
    const groups = await getKuratorinGroup(kurator.kurator_id)
    return groups
}
const Schedule = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserTeacher(session)
  const teacher =await  GetTeacher(user?.id)
  const kurator =await  GetKurator(user?.id)
  const groups =await  getGroup(kurator)
    return (
      <>
      <div>
        <ScheduleTeacher teacher_id={teacher?.teacher_id} groups={groups}/> 
      </div>
      </>
    )
}

export default Schedule