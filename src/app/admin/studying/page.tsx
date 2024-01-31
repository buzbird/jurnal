import React from 'react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div>
       <div>
        <ul>
        <li className="menu-item"><Link href="/admin/studying/periods">Учебные периоды</Link></li>
        <li className="menu-item"><Link href="/admin/studying/periodssetting">Настройка учебных периодов</Link></li>
        <li className="menu-item"><Link href="/admin/studying/disciplineslist">справочник дисциплин</Link></li>
        <li className="menu-item"><Link href="/admin/studying/roomslist">справочник кабинетов</Link></li>
        <li className="menu-item"><Link href="/admin/studying/grouplink">привязка групп</Link></li>
        <li className="menu-item"><Link href="/admin/studying/disciplinelink">привязка дисциплин</Link></li>
        <li className="menu-item"><Link href="/admin/studying/statementofhours">ведомость учета часов</Link></li>
        <li className="menu-item"><Link href="/admin/studying/schedule">Расписание</Link></li>
        </ul>
    </div>

    </div>
  )
}

export default Admin