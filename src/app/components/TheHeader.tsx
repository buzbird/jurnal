import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header2 from './Header';


const getHeader = async(session:any) =>{
    const header = await fetch(process.env.API +"/api/header",{
        method:'POST',
        body: JSON.stringify({email: session?.user?.email}),
    })
    const data = await header.json()
    console.log(data)
    return data
}

export default async function TheHeader(){
    const session = await getServerSession(authOptions)
    const log = session ==undefined
    const data = await getHeader(session)
    console.log(data)
    return (
            <>
            <header>
            <div className='fc'><Link href="/">Home</Link></div>
            <Header2 data={data}/>
            <div><Link href="/schedule/student">расписание</Link></div>
        {log ? (<div ><Link href="/auth/signin">войти</Link></div>):(<div><Link href="/auth/signout">выйти</Link></div>)}
    </header>
            </>
    )
};