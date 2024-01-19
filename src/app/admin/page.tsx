import React from 'react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div>
        <li><Link href="/admin/users">Пользователи</Link></li>
        <li><Link href="/admin/group">Группа</Link></li>
        <li><Link href="/admin/studying">Учебный процесс</Link></li>
    </div>
  )
}

export default Admin