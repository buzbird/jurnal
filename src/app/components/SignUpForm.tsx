"use client";
import React,{useState} from 'react'
import { signUp } from '../actions/users/signUp';

const SignUpForm = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [message,setMessage] = useState('')
  const handleSubmit = async() =>{
    setMessage("Signing up...")
    const message = await signUp(email,password)
    setMessage(message)
  }
  return (
    <div>
        <div>
          <input type='text' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <input type='password'value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <button onClick={handleSubmit}>SignUp</button>
        <p>{message}</p>
    </div>
  )
}

export default SignUpForm