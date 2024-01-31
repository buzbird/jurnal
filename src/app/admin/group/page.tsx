import React from 'react'
import Link from 'next/link'

const Group = () => {
  return (
    <div>
       <ul>
        <li className="menu-item"><Link href={"/admin/group/list"}>группы</Link></li>
        <li className="menu-item"><Link href={"/admin/group/studentlist"}>список студентов в группе</Link></li>
        <li className="menu-item"><Link href={"/admin/group/specializations"}>специальности</Link></li>
       </ul>
    </div>
  )
}

export default Group