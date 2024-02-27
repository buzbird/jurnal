import React from 'react'
import { getServerSession } from 'next-auth';

import { GetAllStatemnt2,getUser,getTeacher, getStudent } from '@/db/fetch'

import ScheduleStudentByGroup from '@/app/components/students/Studentform';
import { authOptions } from '@/app/utils/authOptions'


const getUserStudents= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetStudents= async(user_id:any) =>{
  const teacher = await getStudent(user_id)
  return teacher
}
const getLesson = async(teacher_id:any) =>{
  const data  = await GetAllStatemnt2(teacher_id)
  return data
}
const Shedule = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserStudents(session)
  const student =await  GetStudents(user?.id)
  console.log(student)
      return (
        <>
        <div>
          <ScheduleStudentByGroup data={student}/>
        </div>
        </>
      )
}

export default Shedule