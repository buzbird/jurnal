import React from 'react'
import Link from 'next/link'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
const Jurnal = async() => {
    const lesson = await fetch(process.env.API +"/api/jurnal/teacher",{
        method:'POST',
        body: JSON.stringify({teacher_id: 1}),
    })
    const data = await lesson.json()
    console.log(data)
    
    return (
      
      <JurnalForm lesson={data}/>
    )
}

export default Jurnal