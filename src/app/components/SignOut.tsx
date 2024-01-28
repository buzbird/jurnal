"use client";
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

const SignOut = () => {
    useEffect(()=>{
        signOut({
            redirect: true,
            callbackUrl:'http://5.35.93.157:3000/',
        });
    },[])
  return (
    null
  )
}

export default SignOut