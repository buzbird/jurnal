import React from 'react'
import { getServerSession } from 'next-auth';
import { getStudent, getStudentlessons, getUser } from '@/db/fetch';

import AssesmentStudentByGroup from '@/app/components/students/Assessmentstudent';
import { authOptions } from '@/app/utils/authOptions'


const getUserStudents= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetStudents= async(user_id:any) =>{
  const teacher = await getStudent(user_id)
  return teacher
}

const Shedule = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserStudents(session)
  const student =await  GetStudents(user?.id)
  const lesson = await getStudentlessons(student?.group?.id)
  console.log(lesson)
      return (
        <>
        <div className='pd-2'>
          <AssesmentStudentByGroup group={student} lessons={lesson}/>
        </div>
        </>
      )
}

export default Shedule