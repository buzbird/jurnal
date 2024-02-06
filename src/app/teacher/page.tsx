import React from 'react'
import { getServerSession } from 'next-auth';
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { GetAllStatemnt,getUser,getTeacher } from '@/db/fetch'
import { authOptions } from '../api/auth/[...nextauth]/route';
const getUserTeacher= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetTeacher= async(user_id:any) =>{
  const teacher = await getTeacher(user_id)
  return teacher
}
const getLesson = async(teacher_id:any) =>{
  const data  = await GetAllStatemnt(teacher_id,undefined,undefined)
  return data
 
}
const Jurnal = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserTeacher(session)
  const teacher =await  GetTeacher(user?.id)
  const data = await getLesson(teacher?.teacher_id)
  console.log(data)
      return (
        <JurnalForm lesson={data} teacher={teacher}/>
      )
}

export default Jurnal