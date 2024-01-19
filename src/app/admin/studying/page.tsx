import React from 'react'
import Link from 'next/link'

const Admin = () => {
  return (
    <div>
       <div>
        <li><Link href="/admin/studying/periods">Учебные периоды</Link></li>
        <li><Link href="/admin/studying/periodssetting">Настройка учебных периодов</Link></li>
        <li><Link href="/admin/studying/disciplineslist">справочник дисциплин</Link></li>
        <li><Link href="/admin/studying/roomslist">справочник кабинетов</Link></li>
        <li><Link href="/admin/studying/grouplink">привязка групп</Link></li>
        <li><Link href="/admin/studying/disciplinelink">привязка дисциплин</Link></li>
        <li><Link href="/admin/studying/statementofhours">ведомость учета часов</Link></li>
        <li><Link href="/admin/studying/schedule">Расписание</Link></li>
    </div>

    </div>
  )
}

export default Admin