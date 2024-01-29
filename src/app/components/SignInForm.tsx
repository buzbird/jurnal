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
            redirect: false,
            
        })
        if(!signInResponse || signInResponse?.ok !== true){
            setMessage('invalid credentials');
        }else{
            router.refresh();
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
    <div className='flex w-full h-full justify-center content-center'>
       <form className='loginform'>
       <div>
          <input type='text' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <input type='password'value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button className='' onClick={handleSubmit}>войти</button>
       </form>
        <p>{message}</p>
    </div>
  )
}

export default SignInForm