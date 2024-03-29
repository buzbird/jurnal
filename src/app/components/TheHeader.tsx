import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from '@/app/utils/authOptions'
import { getUser } from '@/db/fetch';

const getUser2= async(session:any) =>{
    const user = await getUser(session.user?.email)
    return user
   
  }
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
    let user;
    const log = session==undefined
    if(log){
        data= []
    }else{
        user = await getUser2(session)
        data = await getHeader(session)
    }
    return (
            <>
            <header className='top-menu'>
            <ul className="menu-main">
            
            <li className="menu-item"><Link href="/">Главная</Link></li>

        
                
        {log ? (<>
            <li className="menu-item"><Link href="/schedule/student">Расписание</Link></li>
        <li className="menu-item"><Link href="/auth/signin">Войти</Link></li>
        </>
        ):(<>
               <li className="menu-item dark"><Link href="">{user?.full_name}</Link></li>
            {data.map((data:any)=>{
                return(
                    <>
                    {data.permission.map((permission:any)=>{
                        console.log(permission)
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
                {data.permission.map((permission:any,index:any)=>{
                    if (permission.permission_id == 4){
                        return (<li key={index} className="menu-item"><Link href="/schedule/teacher">Расписание</Link></li>);
                       
                    }
                })} 
                </>
                );
            })}
             {data.map((data:any)=>{
                return(
                <>
                {data.permission.map((permission:any,index:any)=>{
                    if (permission.permission_id == 5){
                        <li key={index} className="menu-item"><Link href="/schedule/student">Расписание</Link></li>
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
                {data.permission.map((permission:any,index:any)=>{
                    if (permission.permission_id == 3){
                        return(<li key={index} className="menu-item"><Link href="/kurator/">Куратор</Link></li>);
                    }
                })}
                </>
                );
            })}
            
            {data.map((data:any)=>{
                return(<>
                {data.permission.map((permission:any,index:any)=>{
                     if (permission.permission_id == 4){ return(<li key={index} className="menu-item"><Link href="/teacher/">выставление оценок</Link></li>)}
                })}</>)
            })}
            {data.map((data:any)=>{
                return(<>
                {data.permission.map((permission:any,index:any)=>{
                    if (permission.permission_id == 5){
                        return (<li key={index} className="menu-item"><Link href="/student/assessment/">Оценки</Link></li>);
                }
            })}
                </>
                )
            })}
            {data.map((data:any)=>{
                return(<>
                {data.permission.map((permission:any,index:any)=>{
                    if (permission.permission_id == 5){
                        return (<li key={index} className="menu-item"><Link href="/student/shedule/">Расписание</Link></li>);
                }
            })}
                </>
                )
            })}
     
        <li className="menu-item"><Link href="/auth/signout">Выйти</Link></li>
        </>)}
        </ul>
    </header>
            </>
    )
};