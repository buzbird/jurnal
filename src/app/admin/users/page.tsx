import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React, { useState } from 'react'
import Modal from "@/app/components/Modals/СreateUser"
import UpdateUser from "@/app/components/Modals/UpdateUser"
async function getUserall() {
    const session = await getServerSession(authOptions)
    const users = await fetch(process.env.API +"/api/admin/users",{
        method:'POST',
        body: JSON.stringify({email: session?.user?.email}),
    })
    const data = await users.json()
    return(<>
        
            {data.data.users.map((user:any) => {
                return (
                <>
                <tr>
                    <td>{user.id} </td>
                    <td>{user.login}</td>
                    <td>{user.full_name}</td>
                    <td> {user.permission.map((permission:any,index:any) => {
                        return (
                            <button key={index}>{permission.permission?.permission_name}</button>
                        );
                    })}</td>
                    <td><UpdateUser login={user.login} full_name={user.full_name}/></td>
                </tr></>
                );
            })}
            </>
        )
  }
const Users = async() => {
  
  const users = await getUserall()
  return (
    <div>
        пользователи
        <><Modal/></>
        <table >
            <thead>
                <tr>
                    <th>id</th>
                    <th>Логин</th>
                    <th>ФИО</th>
                    <th>Роли</th>
                    <th>Редактировать</th>
                </tr>
            </thead>
            <tbody>
            {users}
            </tbody>
        </table>
        
    </div>
  )
}

export default Users