import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header2 from './Header';



export default async function TheHeader(){
    const session = await getServerSession(authOptions)
    const log = session ==undefined

    console.log(data)
    return (
            <>
            <header>
            <div className='fc'><Link href="/">Home</Link></div>
            <Header2 data={session}/>
            <div><Link href="/schedule/student">расписание</Link></div>
        {log ? (<div ><Link href="/auth/signin">войти</Link></div>):(<div><Link href="/auth/signout">выйти</Link></div>)}
    </header>
            </>
    )
};