"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab } from "@/app/actions/schedule/gecab";
import { getLessonfromDate } from "@/app/actions/schedule/getLessonfromDate";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import React, { useState } from "react";
const ScheduleStudent = (data:any) => {
  const [date, setDate] = useState(new Date());
  const [tableviews,setTable] = useState(false)
  const [group,setgroup] =useState("") ;
  const [table,setTables] = useState({lessons:[]})
  const [groupmass,setgroupmass] =useState(new Map()) ;
  const m = [1,2,3,4,5,6]
  const checktable = async()=>{
    setTables({lessons:[]})
    console.log(date,groupmass.get(group))
    const lessons2 = await getLessonfromDate(date,groupmass.get(group))
    setTables(lessons2)
    await setTable(true)
    await console.log(table)
  }
  const changDate = async(date:any)=>{
    let lessons2;
    setDate(new Date(date))
    if(groupmass.get(group) == undefined){
      lessons2 = {lessons:[]}
    }else{
      lessons2 = await getLessonfromDate(date,groupmass.get(group))
    }
    setTables(lessons2)

  }
  const changeGroup = async(group:any)=>{
    setTables({lessons:[]})
    await setgroup(group)
    await checktable()
    await setTable(true)
  }
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />
      <input type='search' list="groups" onChange={(e)=> changeGroup(e.target.value)} placeholder="выберите предмет" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
      <datalist id="groups">
          <>
          {data.data.groups.map((group:any,index:any)=> {
            groupmass.set(`${group.group_name}`,group.id)
            return(
              <option key={index}>{group.group_name}</option>
            );
            })} 
          </>
      </datalist>
      {tableviews ? (
        <>
        <table>
        <thead>
          <tr>
            <th>№</th>
            <th>предмет</th>
            <th>кабинет</th>
          </tr>
            
        </thead>
        <tbody>
        {m.map((i:any,index:any) =>{
          return(
           <tr key={index}>
           <td>{i}</td>
            {/* {table.lessons.map((table:any,index:any) => {

             if(i ==  table.lesson_number){
              return(
                    <td key={index}>
                      {table.specialization.specialization.lesson_name}
                      <br/>{table.specialization.teacher.user.full_name}
                  </td>
            );
             }
            })} 
            {table.lessons.map((table:any,index:any) => {
             if(i ==  table.lesson_number){
              return(
                  <td key={index}>
                      {table.cabinet.number}
                  </td>
            );
             }
            })}  */}
           </tr>
          )
        })}
        </tbody> 
      </table>
        </>
      ):null}
    </>
  );
};


export default ScheduleStudent;