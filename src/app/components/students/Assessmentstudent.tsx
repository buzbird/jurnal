"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab } from "@/app/actions/schedule/gecab";
import { getLessonfromDate } from "@/app/actions/schedule/getLessonfromDate";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import React, { useState } from "react";
const AssesmentStudentByGroup = ({group,lessons}:any) => {
  console.log(group)
  let lessonmass = new Map();
  const [lesson,setLesson] = useState("")
  const [date,setDate] = useState(new Date())
  const [view,setView] = useState(false)
  const [assesments,setAssesments] = useState({lessons:[],assesments:[]})
  const getAssessment = async(lesson_id:any) =>{
    const lessons2 = await fetch("/api/student/assesment/",{
      method:'POST',
      body: JSON.stringify({lesson_id:lesson_id,group_id:group.group_id,student_id:group.id,date: date}),
    })
    let data = await lessons2.json()
    console.log(data)
    // setAssesments(data)
    setView(true)
  }
  const LessonHandler = async(lesson:any) =>{
    if(lesson == ""){setView(false)}else{
      setLesson(lesson)
      getAssessment(lessonmass.get(lesson))
    }
  }
  
  const changeDate = async(date:any) =>{
    if(date==""){await setDate(new Date())}else{
      await setDate(new Date(date))
      console.log(date)
      if(lesson == ""){}else{
        getAssessment(lessonmass.get(lesson))
      }
    }
    
  }
  
  return (
    <>
    <input type="search" list='lesson' placeholder='Фильтрация по предметам'onChange={(e) =>{LessonHandler(e.target.value)}} />
    <datalist id="lesson">
                      <>
                      {lessons.map((lesson:any)=>{
                        lessonmass.set(`${lesson.specialization?.lesson_name}`,lesson.specialization?.id)
                        return(
                          <>
                            <option>{lesson.specialization?.lesson_name}</option>
                          </>
                        )
                      })
                      }
                      </>
    </datalist>
    <input type="month" value={date.toISOString().slice(0,7)} onChange={(e) =>{changeDate(e.target.value)}}/>
    {view ? (
      <>
      <table>
        <thead>
          <th>
            <td>{lesson}</td>
          </th>
        </thead>
        <tbody> 
          <tr>
          {assesments.lessons.map((assesment:any,index:any)=>{
            return(<td>
              
            </td>);
          })}
          </tr>
          <tr>
          {assesments.assesments.map((assesment:any,index:any)=>{
            return(<td>

            </td>);
          })}
          </tr>
          {}
        </tbody>
      </table>
      </>
    ): null
    }
    </>
  );

};


export default AssesmentStudentByGroup;