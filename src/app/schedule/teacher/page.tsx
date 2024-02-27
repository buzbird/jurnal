import React from 'react'
import { getServerSession } from 'next-auth';
import ScheduleTeacher from '@/app/components/Modals/schedule/teacher/Schedule'
import { getUser,getTeacher } from '@/db/fetch'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const getUserTeacher= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetTeacher= async(user_id:any) =>{
  const teacher = await getTeacher(user_id)
  return teacher
}
const Schedule = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserTeacher(session)
  const teacher =await  GetTeacher(user?.id)
    return (
      <>
      <div>
        <ScheduleTeacher teacher_id={teacher?.teacher_id}/> 
      </div>
      </>
    )
}

export default Schedule