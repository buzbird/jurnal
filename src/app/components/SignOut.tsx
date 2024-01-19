"use client";
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

const SignOut = () => {
    useEffect(()=>{
        signOut({
            redirect: true,
            callbackUrl:'/',
        });
    },[])
  return (
    null
  )
}

export default SignOut