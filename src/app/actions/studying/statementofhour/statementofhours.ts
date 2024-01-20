"use server"
import React from 'react'
import { Clearcache } from '../../clearcache/clearcache'
import { GetAllStatemnt } from "@/db/fetch"
const Statementofhours = async(teacher_id:any,group_id:any,lesson_id:any,date:Date) => {
    Clearcache("/admin/studying/statementofhours")
    Clearcache("/api/admin/studying/statementofhours")
    console.log("пишу пишу")
    let statement:any;
    try{
        statement  = await GetAllStatemnt(teacher_id,group_id,lesson_id)

      }catch(err){
        console.log(err);
    }
    
    let id2 =0;
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    statement.map((statemen:any)=>{
        let dm = 0;
        let max = Number(statemen.hours)
        let dateoflessons = [{date:"",count:0}];
        let id =0;
        let date = "";
        statemen.dateoflessons.map((createDateofLesson:any)=>{
            if(new Date(createDateofLesson.date)>= startDate && new Date(createDateofLesson.date)<=endDate)
            {
            if(date != createDateofLesson.date){
                date = createDateofLesson.date
                dateoflessons.push({date:createDateofLesson.date,count: 1})
                id = id+1;
                dm = dm + 1
            }else{
                dateoflessons[id].count = dateoflessons[id].count + 1
                dm = dm + 1
            }
            
        }
        max= max - 2
        })
        dateoflessons.splice(0,1)
        statement[id2].dm = dm
        
        statement[id2].ost = max
        statement[id2].dateoflessons = dateoflessons
        id2= id2+1
    })
    return statement
}

export default Statementofhours