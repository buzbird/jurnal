import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { getKuratorinGroup,getUser,getKurator } from '@/db/fetch'
import Kuratorform from '../components/kurator/Kuratorform';

const getUserTeacher= async(session:any) =>{
  const user = await getUser(session.user?.email)
  return user
 
}
const GetKurator= async(user_id:any) =>{
  const teacher = await getKurator(user_id)
  return teacher
}
const getGroup= async(kurator:any) =>{
    const groups = await getKuratorinGroup(kurator.kurator_id)
    return groups
}
  
const Jurnal = async() => {
    const session = await getServerSession(authOptions)
    const user = await getUserTeacher(session)
    const kurator =await  GetKurator(user?.id)
    const groups = await getGroup(kurator)
      return (
        <Kuratorform kurator={kurator} groups={groups}/>
      )
}

export default Jurnal