import React from 'react'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
import { GetAllStatemnt } from '@/db/fetch'
const getLesson = async() =>{
  const data  = await GetAllStatemnt(1,undefined,undefined)
  return data
 
}
const Jurnal = async() => {
  // const data = await getLesson()
      return (
        <> 
        1
        </>
        // <JurnalForm lesson={data}/>
      )
}

export default Jurnal