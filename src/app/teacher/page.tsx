import React from 'react'
import { getServerSession } from 'next-auth';
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { GetAllStatemnt } from '@/db/fetch'
import { authOptions } from '../api/auth/[...nextauth]/route';
const getLesson = async() =>{
  const data  = await GetAllStatemnt(1,undefined,undefined)
  return data
 
}
const Jurnal = async() => {
  const session = await getServerSession(authOptions)
  console.log(session)
  // const data = await getLesson()
      return (
        <> 
        1
        </>
        // <JurnalForm lesson={data}/>
      )
}

export default Jurnal