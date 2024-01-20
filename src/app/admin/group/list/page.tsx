import React from 'react'
import Link from 'next/link'

import { getServerSession } from 'next-auth'
import Update from '@/app/components/Modals/Group/Update'
import Create from '@/app/components/Modals/Group/Create'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
async function getGroup() {
  const session = await getServerSession(authOptions)
  const group = await fetch(process.env.API +"/api/admin/group",{
    method:'POST',
    body: JSON.stringify({email: session?.user?.email}),
  })
  const data = await group.json()
  console.log(data.data.group)
  return(
    <>
    {data.data.group.map((group:any)=> {
      return (<>
      <tr>
          <td>{group.id} </td>
          <td>{group.group_name}</td>
          <td>{group.kurs}</td>
          <td>{group.specialization.specializations_name}</td>
          <td>{group.kurator.user.full_name}</td>
          <td><Update id={group.id} group_name={group.group_name} kurs={group.kurs} kurator_id={1}specializations_name={group.specialization.specializations_name} /></td>
      </tr></>
      );
    })}
    </>
  )
}
const Group = async() => {
  const group = await getGroup()
  return (
    <><div>
      Группы 
      <Create/>
      <table >
            <thead>
                <tr>
                    <th>id</th>
                    <th>группа</th>
                    <th>Курс</th>
                    <th>Специальность</th>
                    <th>Куратор</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
            {group}
            </tbody>
      </table>
    </div></>
  )
}

export default Group