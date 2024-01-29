import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';


const getHeader = async(session:any) =>{
    const header = await fetch(process.env.API +"/api/header",{
        method:'POST',
        body: JSON.stringify({email: session?.user?.email}),
    })
    const data = await header.json()
    return data
}

export default async function TheHeader(){
    let data = [];
    const session = await getServerSession(authOptions)
    const log = session==undefined
    if(log){
        data= []
    }else{
        data = await getHeader(session)
    }
    return (
            <>
            <header className='top-menu'>
            <ul className="menu-main">
            
            <li className="menu-item"><Link href="/">Главная</Link></li>

        {data.map((data:any)=>{
            return(
                <>
                {data.permission.map((permission:any)=>{
                if (permission.permission_id == 1){
                    return (<><li className="menu-item"><Link href="/admin/">Администратор</Link></li></>)
                }
            })}
                </>
            );
            
        })}
        {data.map((data:any)=>{
            return(
            <>
            {data.permission.map((permission:any)=>{
                if (permission.permission_id == 3){
                    <li className="menu-item"><Link href="/teacher/">Куратор</Link></li>
                }
            })} 
            </>
            );
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any,index:any)=>{
                if (permission.permission_id == 2){
                    return(<li key={index} className="menu-item"><Link href="/schedule/">Составитель расписания</Link></li>);
                }
            })}
            </>
            );
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any)=>{
                 if (permission.permission_id == 4){<li className="menu-item"><Link href="/teacher/">Преподаватель</Link></li>}
            })}</>)
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any,index:any)=>{
                if (permission.permission_id == 5){
                    return (<li key={index} className="menu-item"><Link href="/Admin/">студентов</Link></li>);
            }
        })}
            </>
            )
        })}
                <li className="menu-item"><Link href="/schedule/student">расписание</Link></li>
        {log ? (<li className="menu-item"><Link href="/auth/signin">войти</Link></li>):(<li className="menu-item"><Link href="/auth/signout">выйти</Link></li>)}
        </ul>
    </header>
            </>
    )
};