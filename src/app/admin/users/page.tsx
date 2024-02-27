
import { getServerSession } from 'next-auth'
import React, { useState } from 'react'
import Modal from "@/app/components/Modals/СreateUser"
import UpdateUser from "@/app/components/Modals/UpdateUser"

import { getUsers } from "@/db/fetch"
import { authOptions } from '@/app/utils/authOptions'
async function getUserall() {
    const session = await getServerSession(authOptions)
    const data = await getUsers()
    return(<>
        
            {data.map((user:any) => {
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