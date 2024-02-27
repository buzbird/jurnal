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
  let lessonmass = new Map();
  const [lesson,setLesson] = useState("")
  const [date,setDate] = useState(new Date())
  const [view,setView] = useState(false)
  const [assesments,setAssesments] = useState({lessons:[],assesment:[]})
  const getAssessment = async(lesson_id:any,date:any) =>{
    
    const lessons2 = await fetch("/api/student/assesment/",{
      method:'POST',
      body: JSON.stringify({lesson_id:lesson_id,group_id: group.group_id,date: date,student_id:group.id}),
    })
    let data = await lessons2.json()
    setAssesments(data)
    setView(true)
  }
  const LessonHandler = async(lesson:any) =>{
    if(lesson == ""){setView(false)}else{
      setLesson(lesson)
      getAssessment(lessonmass.get(lesson),date)
    }
  }
  
  const changeDate = async(date:any) =>{
    if(date==""){await setDate(new Date())}else{
      await setDate(new Date(date))
      if(lesson == ""){}else{
        getAssessment(lessonmass.get(lesson),new Date(date))
      }
    }
    
  }
  
  return (
    <>
    <input type="search" list='lesson' placeholder='Фильтрация по предметам'onChange={(e) =>{LessonHandler(e.target.value)}} />
    <datalist id="lesson">
                      {lessons.map((lesson:any,index:any)=>{
                        lessonmass.set(`${lesson.specialization?.lesson_name}`,lesson.id)
                        return(
                          <>
                            <option key={index}>{lesson.specialization?.lesson_name}</option>
                          </>
                        )
                      })
                      }
     
    </datalist>
    <input type="month" value={date.toISOString().slice(0,7)} onChange={(e) =>{changeDate(e.target.value)}}/>
    {view ? (
      <>
      <table className="tab">
        <tbody> 
          <tr>
            <td>Дата:</td>
          {assesments.lessons.map((assesment:any,index:any)=>{
            return(<td className="dsc" key={index}>
              {new Date(assesment.date).getDate()}
            </td>);
          })}
          </tr>
          <tr>
          <td>Оценки:</td>
          {assesments.lessons.map((assesment:any,index:any)=>{
            return(<td className="dsc" key={index}>
             {assesments.assesment.map((number:any)=>{

              if(assesment.id == number.lesson_id){
                let a = number.numbers.join(',')
                return(<>{a}</>)
              }
             })}
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