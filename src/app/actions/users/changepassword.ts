"use server";

import { getUsers, changepassword } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const Changepassword = async() =>{
    let users = await getUsers()
    let passwords = new Map()
    const makeString = () => {
        let outString: string = '';
        let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < 10; i++) {
    
          outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    
        }
    
        return outString;
      }
    let  secret_key = process.env.NEXTAUTH_SECRET
    if(secret_key != undefined){
        users.map((user:any)=>{
            let password = makeString() 
            console.log(user.full_name,",",user.login,",",password)
            changepassword(user.id,bcrypt.hashSync(password,10))
        })
    }
    return "Success..."
}