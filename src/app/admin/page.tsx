import React from 'react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div>
        <ul>
          <li className="menu-item"><Link href="/admin/users">Пользователи</Link></li>
          <li className="menu-item"><Link href="/admin/group">Группа</Link></li>
          <li className="menu-item"><Link href="/admin/studying">Учебный процесс</Link></li>
        </ul>
    </div>
  )
}

export default Admin