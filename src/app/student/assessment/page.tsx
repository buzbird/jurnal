import React from 'react'
import { getServerSession } from 'next-auth';

import { getUser, getStudent,getStudentlessons  } from '@/db/fetch'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ScheduleStudentByGroup from '@/app/components/students/Studentform';
import AssesmentStudentByGroup from '@/app/components/students/Assessmentstudent';

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
        <div>
          <AssesmentStudentByGroup group={student} lessons={lesson}/>
        </div>
        </>
      )
}

export default Shedule