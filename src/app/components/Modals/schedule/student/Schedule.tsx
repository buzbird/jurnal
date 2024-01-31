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
  const [table,setTables] = useState([{}])
  const [groupmass,setgroupmass] =useState(new Map()) ;
  const m = [1,2,3,4,5,6]
  const checktable = async(groups:any)=>{
    let date2 = new Date(date.toISOString().slice(0,10))
    const lessons2 = await fetch("/api/student/jurnal/",{
      method:'POST',
      body: JSON.stringify({date:date2,group_id:groupmass.get(groups)}),
    })
    let data = await lessons2.json()
    if(data!=undefined){
      setTables(data)
    }
    await setTable(true)
  }
  const changDate = async(date2:any)=>{
    let lessons2 = undefined;
    
    await setDate(new Date(date2))
    if(groupmass.get(group) == undefined){
      lessons2 = [{}]
    }else{
      data = await fetch("/api/student/jurnal/",{
        method:'POST',
        body: JSON.stringify({date:new Date(date2),group_id:groupmass.get(group)}),
      })
      lessons2 = await data.json()
    }
    if(lessons2!= undefined){
      setTables(lessons2)
    }

  }
  const changeGroup = async(group:any)=>{
    await setgroup(group)
    await checktable(group)
  }
  return (
    <>
      <input type="date" value={date.toISOString().slice(0,10)} onChange={(e)=> changDate(e.target.value)} />
      <input type='search' list="groups" onChange={(e)=> changeGroup(e.target.value)} placeholder="выберите группу"/>
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
    </>
  );
};


export default ScheduleStudent;