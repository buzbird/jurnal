import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { GetAllStatemnt2,getUser,getTeacher,getKurator,getKuratorinGroup } from '@/db/fetch'

const getUserTeacher= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetTeacher= async(user_id:any) =>{
  const teacher = await getTeacher(user_id)
  return teacher
}
const getLesson = async(teacher_id:any) =>{
  const data  = await GetAllStatemnt2(teacher_id)
  return data
}

const Jurnal = async() => {
  const session = await getServerSession(authOptions)
  const user = await getUserTeacher(session)
  const teacher =await  GetTeacher(user?.id)
  const data = await getLesson(teacher?.teacher_id)

  console.log(data)
      return (
        <JurnalForm lessons={data} teacher={teacher}/>
      )
}

export default Jurnal