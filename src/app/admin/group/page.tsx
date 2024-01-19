import React from 'react'
import Link from 'next/link'

const Group = () => {
  return (
    <div>
        <li><Link href={"/admin/group/list"}><button>группы</button></Link></li>
        <li><Link href={"/admin/group/studentlist"}><button>список студентов в группе</button></Link></li>
        <li><Link href={"/admin/group/specializations"}><button>специальности</button></Link></li>
    </div>
  )
}

export default Group