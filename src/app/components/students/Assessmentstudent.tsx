"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab } from "@/app/actions/schedule/gecab";
import { getLessonfromDate } from "@/app/actions/schedule/getLessonfromDate";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import React, { useEffect, useState } from "react";
const AssesmentStudentByGroup = ({group,lessons}:any) => {
  let lessonmass = new Map();
  const [lesson,setLesson] = useState("")
  const [date,setDate] = useState(new Date())
  const [date2,setDate2] = useState(new Date())
  const [view,setView] = useState(false)
  const [ViewsMonth,setViewsMonth] = useState(false)
  const [ViewsMonthalllesson,setViewsMonthalllesson] = useState(false)
  const [assesments,setAssesments] = useState({lessons:[],assesment:[]})
  const [assesments2,setAssesments2] = useState({assesment:[]})
  const [tablev,settablev] = useState(false)
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
  const changeDate2 = async(date:any) =>{
    if(date==""){await setDate(new Date())}else{
      await setDate2(new Date(date))
        const lessons2 = await fetch("/api/student/assesment/month/",{
          method:'POST',
          body: JSON.stringify({lesson:lessons,group_id: group.group_id,date: date,student_id:group.id}),
      })
        const data = await lessons2.json()
        setAssesments2(data)
        settablev(true)
    }
    
  }
  const changetable = (v1:any,v2:any) => {
    if(v1){
      setViewsMonth(true)
      setViewsMonthalllesson(false)
    }
    if(v2){
      setViewsMonth(false)
      setViewsMonthalllesson(true)
    }
  }
  return (
    <>
    <div>
      <button className="but" onClick={()=>{changetable(true,false)}}>показать по предметам</button>
    </div>
    <div>
      <button className="but" onClick={()=>{changetable(false,true)}}>показать все</button>
    </div>
    {ViewsMonth ? (<>
      <input type="search" list='lesson' placeholder='Выберите предмет'onChange={(e) =>{LessonHandler(e.target.value)}} />
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
    </>):null}
    {ViewsMonthalllesson ?(<>
      <input type="month"  onChange={(e) =>{changeDate2(e.target.value)}}/>
       {tablev ? (
         <table className="tab">
         <thead>
         <th></th>
         <Dates month={date2.getMonth()}/>
         </thead>
         <tbody>
           
         {assesments2.assesment.map((lesson:any,index:any)=>{
            console.log(lesson)
           const dates: Date[] = [];
             const currentDate = new Date(new Date().getFullYear(),date2.getMonth()); // Month argument is 0-based()
            let a= true
             while (currentDate.getMonth() === date2.getMonth()) {
               dates.push(new Date(currentDate));
               currentDate.setDate(currentDate.getDate() + 1);
             }
           return(
             <>
             <tr key={index}>
                 <td  className="dsc">{lesson.lesson?.specialization?.lesson_name}</td>
                 {dates.map((date:any,index:any) =>{
                  a=true
                  let k = {numbers:[]}
                  lesson.assesments.map((assesment:any,index:any)=>{

                    if(new Date(date).getDate() == new Date(assesment.date).getDate()){
                      a= false
                      k = assesment
                    }
                                      
                  })
                  if(a){return( <td key={index}  className="dsc"></td>)}else{
                    return(
                      <td key={index}  className="dd">
                        {k.numbers.map((number:any,index:any)=>{

                          if(index < k.numbers.length-1){
                            return (<>{number},</>)
                          }else{
                            return (<>{number}</>)
                          }
                        })}
                      </td>
                    )
                  }
                 })
                 }
             </tr>  
             </>
           )
         })
         }
         </tbody>
       </table>

       ): null}
    </>):null}
    </>
  );

};

// function  Assesment({lesson_id,group_id,date,student_id}:any){
//   console.log(lesson_id.lesson_id)
//   console.log(date)
//   const [lesson,setlesson] = useState({assesment:[]})
//   const dd = async() =>{
    
//     setlesson(data)
//   }
//   const dates: Date[] = [];
//   const currentDate = new Date(new Date().getFullYear(),date.getMonth()); // Month argument is 0-based()
//   dd()

//   console.log("---------------------------------")
//   console.log(lesson)
//   console.log("---------------------------------")

//   while (currentDate.getMonth() ===  date.getMonth()) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return(
//     <>
//       {
//         dates.map((date:any,index:any) =>{
//           if(lesson.assesment.length == 0){
//             return(
//               <td key={index} className="prepod"> </td>
//             )
//           }else{
//             return(
//               <td key={index} className="dsc"> </td>
//             )
//           }
          
//         })
//       }
//     </>
//   )
// }
function Dates(month: any){
  const dates: Date[] = [];
  const currentDate = new Date(new Date().getFullYear(),month.month); // Month argument is 0-based()

  while (currentDate.getMonth() ===  month.month) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return(
    <>
      {
        dates.map((date:any,index:any) =>{
          const day = new Date(date).getDate()
          return(
            <th key={index}>{day}</th>
          )
        })
      }
    </>
  )
}



export default AssesmentStudentByGroup;