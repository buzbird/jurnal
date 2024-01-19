import React from 'react'
import Link from 'next/link'
import Statementofhour from '@/app/components/Modals/Statementofhours/statementofhours'
import Statementofhours from '@/app/actions/studying/statementofhour/statementofhours'



const Admin = async() => {
  return (
    <div>
      <Statementofhour/>
    </div>
  )
}

export default Admin