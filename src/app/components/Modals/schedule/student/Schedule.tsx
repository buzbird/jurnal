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
  console.log(data)
  const [date, setDate] = useState(new Date());
  const [tableviews,setTable] = useState(false)
  const [group,setgroup] =useState("") ;
  const [table,setTables] = useState([{}])
  const [groupmass,setgroupmass] =useState(new Map()) ;
  const m = [1,2,3,4,5,6]
  const checktable = async(groups:any)=>{
    console.log(date,groupmass.get(groups))
    const lessons2 = await fetch("/api/student/jurnal/",{
      method:'POST',
      body: JSON.stringify({date:date,group_id:groupmass.get(groups)}),
    })
    let data = await lessons2.json()
    if(data!=undefined){
      setTables(data)
    }
    await setTable(true)
    await console.log(table)
  }
  const changDate = async(date:any)=>{
    let lessons2 = undefined;
    setDate(new Date(date))
    if(groupmass.get(group) == undefined){
      lessons2 = [{}]
    }else{
      data = await fetch("/api/student/jurnal/",{
        method:'POST',
        body: JSON.stringify({date:date,group_id:groupmass.get(group)}),
      })
      lessons2 = data.json()
    }
    if(lessons2!= undefined){
      setTables(lessons2)
    }

  }
  const changeGroup = async(group:any)=>{
    await setgroup(group)
    await checktable(group)
    await setTable(true)
  }
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />
      <input type='search' list="groups" onChange={(e)=> changeGroup(e.target.value)} placeholder="выберите предмет" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
      <datalist id="groups">
          <>
          {data.data.map((group:any,index:any)=> {
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
                        <th>
                          номер пары
                        </th>
                        <th>
                          предмет
                        </th>
                        <th>
                          кабинет
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {m.map((i:any,index:any)=>{
                        let rowspanx = 1;
                        table.map((lesson:any)=>{
                          console.log(lesson)
                          if(i==lesson.lesson_number){
                            rowspanx = rowspanx +1
                          }
                          if(rowspanx>= 3){
                            rowspanx = rowspanx+ 1
                          }
                        })
                        return(
                          <>
                          <tr >
                            <td rowSpan={rowspanx}>
                              {i}
                            </td>
                          </tr>
                          {table.map((lesson:any)=>{
                          if(i==lesson.lesson_number){
                          return(
                            <>
                            <tr>
                              <td>
                                {lesson.specialization?.specialization?.full_name}
                              </td>
                            </tr>
                            <tr>
                                <td>
                                {lesson.specialization?.teacher?.user?.full_name}
                                </td>
                            </tr>
                            </>
                          )
                          }
                        })}
                        {table.map((lesson:any)=>{
                          if(i==lesson.lesson_number){
                          return(
                            <>
                            <tr>
                              <td rowSpan={rowspanx}>
                                {lesson.cabinet?.number}
                              </td>
                            </tr> 
                            </>
                          )
                          }
                        })}
                          </>
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