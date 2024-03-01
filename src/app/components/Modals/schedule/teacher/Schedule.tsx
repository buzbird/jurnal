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
    const lessons2 = await fetch("/api/teacher/getlesson/",{
      method:'POST',
      body: JSON.stringify({date:new Date(date),teacher_id:teacher_id}),
    })
    let data = await lessons2.json()
    console.log(data)
    if(data !=undefined){
      setTables(data)
    }
    await setTable(true)
  }
  const changDate = async(date:any)=>{
    setDate(new Date(date))
    const lessons2 = await fetch("/api/teacher/getlesson/",{
      method:'POST',
      body: JSON.stringify({date:new Date(date),teacher_id:teacher_id}),
    })
    let data = await lessons2.json()
    setTables(data)
    await setTable(true)
  }
  const m = [1,2,3,4,5,6]
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />

      {tableviews ? (
        <>
        <table className="tab">
        <thead>
            <tr>
            <th className="hdg">№</th>
            <th className="hdg">предмет</th>
            <th className="hdg">кабинет</th>
            <th className="hdg">группа</th>
            </tr>
        </thead>
        <tbody>
        {m.map((i:any,index:any)=>{
            let rowspanx =  0;
            table.map((table:any)=>{
              if(table.lesson_number == i){
                rowspanx = rowspanx +1 
              }
            })
           console.log(rowspanx)
           if(rowspanx == 1){
            return(<>
            {table.map((lesson:any)=>{
              if(lesson.lesson_number == i){
                return(<>
                  <tr key={index}>
                      <td className="pn">{i}</td>
                       <td key={index} className="dsc">{lesson.specialization?.specialization?.lesson_name}</td>
                       <td className="cab">{lesson.cabinet?.number}</td>
                       <td key={index} className="dsc">{lesson.specialization?.group?.group_name}</td>
                    </tr>
                  </>
                  );
              }
            })}
            </>);
          }
           if(rowspanx >= 2){
            rowspanx= rowspanx +1
            return(
              <>
              <tr>
                <td rowSpan={rowspanx} className="pn">{i}</td>
              </tr>
              {
                table.map((lesson:any,index:any)=>{
                  if(i == lesson.lesson_number){
                   return(
                     <>
                     <tr key={index}>
                       <td key={index} className="dsc">{lesson.specialization?.specialization?.lesson_name}</td>
                       <td className="cab">{lesson.cabinet?.number}</td>
                       <td key={index} className="dsc">{lesson.specialization?.group?.group_name}</td>
                     </tr>
                     </>
 
                   )
                  }
                 })
              }</>
            )
          }
          return(
              <tr key={index}>
                 <td className="pn">{i}</td>
                 <td className="cab"></td>
                 <td className="cab"></td>
                 <td className="cab"></td>
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