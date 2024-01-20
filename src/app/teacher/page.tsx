import React from 'react'
import Link from 'next/link'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
const getLesson = async() =>{
  try{
    const lesson = await fetch(process.env.API +"/api/jurnal/teacher",{
      method:'POST',
      body: JSON.stringify({teacher_id: 1}),
  })
  if(!lesson.ok){
    throw new Error(`Error! status: ${lesson.status}`);
  }
  const data = await lesson.json()
  return data
  }catch(err){
    console.log(err);
  }
}
const Jurnal = async() => {
  const data = await getLesson()
      return (
        <JurnalForm lesson={data}/>
      )
}

export default Jurnal