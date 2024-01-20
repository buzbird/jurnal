"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab } from "@/app/actions/schedule/gecab";
import { getLessonfromDate } from "@/app/actions/schedule/getLessonfromDate";
import { getLessonsTeachers } from "@/app/actions/schedule/getlessonsteacher/getlesson";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import React, { useState } from "react";
const ScheduleTeacher = ({teacher_id}:any) => {
  const [date, setDate] = useState(new Date());
  const [tableviews,setTable] = useState(false)
  const [group,setgroup] =useState("") ;
  const [table,setTables] = useState([{}])
  const [groupmass,setgroupmass] =useState(new Map()) ;
  const checktable = async()=>{
    setTables([{}])
    console.log(date,groupmass.get(group))
    const lessons2 = await getLessonsTeachers(date,teacher_id)
    if(lessons2 !=undefined){
      setTables(lessons2)
    }
    console.log(lessons2)
    await setTable(true)
    await console.log(table)
  }
  const changDate = async(date:any)=>{
    setDate(new Date(date))
    const lessons2 = await getLessonsTeachers(date,teacher_id)
    console.log(lessons2)
    setTables(lessons2)
    await setTable(true)
  }
  const m = [1,2,3,4,5,6]
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />

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
        {m.map((i:any,index:any)=>{
          return(
              <tr key={index}>
                <td>{i}</td>
                {table.map((table:any,index:any) => {
                  if(table.lesson_number == i){
                    return(
                        <td key={index} >{table.specialization.specialization.lesson_name}</td>
                  );
                  }
                  })} 
                {table.map((table:any,index:any) => {
                  if(table.lesson_number == i){
                    return(
                      <td key={index}>{table.cabinet.number}</td>
                  );
                  }
                  })}
              </tr>
          )
        })}

        </tbody> 
      </table>
        </>
      ):null

      }
    </>
  );
};


export default ScheduleTeacher;