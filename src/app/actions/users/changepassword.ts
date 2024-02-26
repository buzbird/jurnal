"use server";

import { getGroups, changepassword } from "@/db/fetch";
import bcrypt from 'bcryptjs';

export const Changepassword = async() =>{
    let groups = await getGroups()
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
        groups.map((group:any)=>{
            console.log(group.group_name)
            group.students.map((student:any)=>{
              let password = makeString() 
              if(student.user?.id>42){
                console.log(student.user?.full_name,",",student.user?.login,",",password)
                changepassword(student.user?.id,bcrypt.hashSync(password,10))
              }
            })
            
        })
    }
    return "Success..."
}