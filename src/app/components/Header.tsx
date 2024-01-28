import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';




export default async function Header2(data: any){
    console.log(data)
    return (
            <>
            <header>
        <div className='fc'><Link href="/">Home</Link></div>

        {data.map((data:any)=>{
            return(
                <>
                {data.permission.map((permission:any)=>{
                if (permission.permission_id == 1){
                    return (<><div className='fc'><Link href="/admin/">Администратор</Link></div></>)
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
                    <div className='fc'><Link href="/teacher/">Куратор</Link></div>
                }
            })} 
            </>
            );
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any,index:any)=>{
                if (permission.permission_id == 2){
                    return(<div key={index} ><Link href="/schedule/">Составитель расписания</Link></div>);
                }
            })}
            </>
            );
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any)=>{
                 if (permission.permission_id == 4){<div ><Link href="/teacher/">Преподаватель</Link></div>}
            })}</>)
        })}
        {data.map((data:any)=>{
            return(<>
            {data.permission.map((permission:any,index:any)=>{
                if (permission.permission_id == 5){
                    return (<div key={index}><Link href="/Admin/">студентов</Link></div>);
            }
        })}
            </>
            )
        })}
                <div><Link href="/schedule/student">расписание</Link></div>
    </header>
    </>
    )
};