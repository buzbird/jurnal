import React from 'react'
import { getServerSession } from 'next-auth';
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { GetAllStatemnt,getUser,getTeacher } from '@/db/fetch'
import { authOptions } from '../api/auth/[...nextauth]/route';
const getLesson = async(session:any) =>{
  const user = await getUser(session.user?.email)
  console.log(user)
  const teacher = await getTeacher(user?.id)
  console.log(teacher)
  const data  = await GetAllStatemnt(teacher?.teacher_id,undefined,undefined)
  return data
 
}
const Jurnal = async() => {
  const session = await getServerSession(authOptions)
  console.log(session)
  const data = await getLesson(session)
  console.log(data)
      return (
        <JurnalForm lesson={data}/>
      )
}

export default Jurnal