"use client";
import React,{useEffect, useState} from 'react'
import { signUp } from '../actions/users/signUp';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();
  const {status} = useSession()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [message,setMessage] = useState('')
  const handleSubmit = async() =>{
    setMessage("Signing up...")
    try {
        const signInResponse = await signIn('credentials',{
            email,
            password,
            redirect: true,
            callbackUrl:'/',
            
        })
        if(!signInResponse || signInResponse?.ok !== true){
            setMessage('invalid credentials');
        }else{
            router.refresh();
            router.push("/");
        }
    }catch(err){
        console.log(err)
    }
    setMessage(message)
  }
  useEffect(()=>{
    if(status ==='authenticated'){
        router.refresh();
        router.push("/");
    }
  },[status])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='flex w-full h-svh justify-center content-center'>
       <div className='loginform'>
       <div className='h-auto'>
          <input type='text' placeholder='Логин' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className='h-auto'>
          <input type='password' placeholder='Пароль' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <div className='h-auto'>
          <button  onClick={handleSubmit}>войти</button>
        </div>
        <p>{message}</p>
       </div>
       
    </div>
  )
}

export default SignInForm