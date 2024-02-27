"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab } from "@/app/actions/schedule/gecab";
import { getLessonfromDate } from "@/app/actions/schedule/getLessonfromDate";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import React, { useState } from "react";
const ScheduleStudentByGroup = (group:any) => {
    console.log(group)

  const [date, setDate] = useState(new Date());
  const startDate = new Date(date.getFullYear(), date.getMonth(), 2);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 5);
  const [tableviews,setTable] = useState(false)
  const [table,setTables] = useState([{}])
  const m = [1,2,3,4,5,6]
  const checktable = async(groups:any)=>{
    let date2 = new Date(date.toISOString().slice(0,10))
    const lessons2 = await fetch("/api/student/jurnal/",{
      method:'POST',
      body: JSON.stringify({date:date2,group_id: group.data.group_id}),
    })
    let data = await lessons2.json()
    if(data!=undefined){
      setTables(data)
    }
    await setTable(true)
  }
  const changDate = async(date2:any)=>{
    let lessons2 = undefined;
    console.log(new Date(date2) < new Date())
    if(new Date(date2) <= new Date()){
      await setDate(new Date())
    }else{
      await setDate(new Date(date2))
    }
    let data;
    if(group.data.group_id == undefined){
      lessons2 = [{}]
    }else{
        data = await fetch("/api/student/jurnal/",{
        method:'POST',
        body: JSON.stringify({date:new Date(date2),group_id:group.data.group_id}),
      })
     
      lessons2 = await data.json()
    }
    if(lessons2!= undefined){
      setTables(lessons2)
      setTable(true)
    }

  }
  return (
    <>
      <div className="flex justify-center items-center"><input type="date" name="party" min={startDate.toISOString().slice(0,10)}  max={endDate.toISOString().slice(0,10)} onChange={(e)=> changDate(e.target.value)} required/></div>
      <div className="flex justify-center items-center">
    <div>
      {tableviews ? (
        <table className="tab">
                    <thead>
                      <tr>
                        <th>
                        </th>
                        <th className="hdg">
                          предмет
                        </th>
                        <th className="hdg">
                          кабинет
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {m.map((i:any,index:any)=>{
                      let rowspanx =  1;
                      table.map((lesson:any)=>{
                        if(i==lesson.lesson_number){
                          rowspanx = rowspanx +1 
                        }
                      })
                      if(rowspanx>=3){
                        rowspanx = rowspanx +2
                      }
                      if(rowspanx == 2){
                        return(
                          table.map((lesson:any,index:any)=>{
                             if(i == lesson.lesson_number){
                              return(
                                <>
                                <tr key={index}>
                                  <td rowSpan={rowspanx} className="pn">{i}</td>
                                  <td className="dsc">{lesson.specialization?.specialization?.lesson_name}</td>
                                  <td rowSpan={rowspanx} className="cab">{lesson.cabinet?.number}</td>
                                </tr>
                                <tr  key={index+1}>
                                  <td className="prepod">{lesson.specialization?.teacher?.user?.full_name}</td>
                                </tr>
                                </>

                              )
                             }
                            })
                          
                        )
                      }
                      if(rowspanx == 5){
                        return(
                          <>
                          <tr>
                            <td rowSpan={rowspanx} className="pn">{i}</td>
                          </tr>
                          {
                            table.map((lesson:any)=>{
                              if(i == lesson.lesson_number){
                                return(
                                  <>
                                  <tr>
                                    <td className="dsc">{lesson.specialization?.specialization?.lesson_name}</td>
                                    <td rowSpan={rowspanx/2} className="cab">{lesson.cabinet?.number}</td>
                                  </tr>
                                  <tr>
                                    <td className="prepod">{lesson.specialization?.teacher?.user?.full_name}</td>
                                  </tr>
                                  </>
  
                                )
                              }
                            })
                          }
                         
                          </>
                        )
                      }
                      return(
                        <>
                        <tr >
                          <td className="pn">{i}</td>
                          <td className="dsc">-</td>
                          <td className="cab">-</td>
                        </tr>
                        </>
                      )
                      })}
                      
                    </tbody>
                  </table>
      ):null}
          </div>
      </div>
    </>
  );

};


export default ScheduleStudentByGroup;