"use client"
import { createuser } from "@/app/actions/admin/users/createuser";



import { getgrouplist } from "@/app/actions/jurnal/teacher/getgroup";
import { Console } from "console";
import { redirect } from "next/dist/server/api-utils";
import test from "node:test";

import React, { useState } from "react";

const JurnalModal = ({lessons,teacher}: any) => {
  const teacher_id = teacher.teacher_id;
  let lessonmass = new Map();
  let groupmass = new Map();
  let assessmetdatestudents = {};
  const [showtable,setShowtable] = useState(false);
  const [showmodal,setShowmodal] = useState(false);
  const [lesson,setLesson] = useState("");
  const [group,setGroup] = useState("");
  const [groups,setGroups] = useState([]);
  const [date3,setDate3] = useState(new Date());
  const [students,setStudent] = useState({students:{students:[{}]}});
  const [studentid,setstudentId] = useState();
  const [assesment_id,setDateId] = useState();
  const [studentName,setstudentName] = useState("");
  const [assessmentStudent,setassessmentStudent] = useState({assessments:[]});
  const [date,setDate] = useState([{}])
  const handleLesson = async(lesson:any) =>{
    try {
      setLesson(lesson);
      console.log(lesson)
      setGroup("");

      setShowtable(false)
      if(lesson == ""){setGroups([])
      }else{
        const data = await fetch("/api/teacher/group/",{
          method:'POST',
          body: JSON.stringify({teacher_id: teacher_id,lesson_id:lessonmass.get(lesson)}),
        })
        let groups2 = await data.json()
        setGroups(groups2)
       
      }
        
    }catch(err){
       console.log(err)
    }
  }
  const handleGroup = async(group:any) =>{
    try {
      setGroup(group);
        const data = await fetch("/api/teacher/assessment/",{
          method:'POST',
          body: JSON.stringify({teacher_id: teacher_id,lesson_id:lessonmass.get(lesson),group_id:groupmass.get(group)}),
        })
        const assessmentgroup = await data.json()
        setShowtable(true)
        if(assessmentgroup!=undefined){
          setStudent(assessmentgroup)
        }
        const lesson_id = await assessmentgroup.assessmentGroup.id
        const data2 =await fetch("/api/teacher/dateforlesson/",{
          method:'POST',
          body: JSON.stringify({lesson_id: lesson_id,date:date3}),
        })
        const date = await data2.json()
        if(date != undefined){
          setDate(date)
        } 
    }catch(err){
       console.log(err)
    }
  }
  const handleDate = async(date2:any)=>{
    setDate3(new Date(date2))
    if(group != ""){
      const data = await fetch("/api/teacher/assessment/",{
        method:'POST',
        body: JSON.stringify({teacher_id: teacher_id,lesson_id:lessonmass.get(lesson),group_id:groupmass.get(group)}),
      })
      const assessmentgroup = await data.json()
      setShowtable(true)
      if(assessmentgroup!=undefined){
        setStudent(assessmentgroup)
      }
      const lesson_id = await assessmentgroup.assessmentGroup.id
      const data2 =await fetch("/api/teacher/dateforlesson/",{
        method:'POST',
        body: JSON.stringify({lesson_id: lesson_id,date:date2}),
      })
      const date = await data2.json()
      if(date != undefined){
        setDate(date)
      } 
    }
  }
  const giveModal= async(date_id: any,student_id: any,student_name:any,date:any) =>{
    try {
      setassessmentStudent({assessments: []});
      setstudentName(student_name);
      setstudentId(student_id)
      setShowmodal(true);  
      setDateId(date_id);
      students.students.students.map((student:any) => {
      if(student.full_name == student_name){
        student.assessments.map((assessment:any) => {
          if(assessment.date== date){
            setassessmentStudent(assessment);
          }
        })
      }
      })
      }catch(err){
          console.log(err)
      }
  }
  const deleteassesment = async(assessment_id:any) =>{
    try {
      setShowmodal(false); 
      await fetch("/api/teacher/assessment/student/",{
        method:'DELETE',
        body: JSON.stringify({assessment_id:assessment_id}),
      }) 
      const data = await fetch("/api/teacher/assessment/",{
        method:'POST',
        body: JSON.stringify({teacher_id: teacher_id,lesson_id:lessonmass.get(lesson),group_id:groupmass.get(group)}),
      })
      const assessmentgroup = await data.json()
      setShowtable(true)
      if(assessmentgroup!=undefined){
        setStudent(assessmentgroup)
      }
      const lesson_id = await assessmentgroup.assessmentGroup.id
      const data2 =await fetch("/api/teacher/dateforlesson/",{
        method:'POST',
        body: JSON.stringify({lesson_id: lesson_id}),
      })
      const date = await data2.json()
      if(date != undefined){
        setDate(date)
      } 

      }catch(err){
          console.log(err)
      }
  }
  
  const createassesment = async(number:any) =>{
    try {
      setShowmodal(false); 
      await fetch("/api/teacher/assessment/student/",{
        method:'POST',
        body: JSON.stringify({number:number,student_id:studentid,lesson_id:assesment_id}),
      }) 
      const data = await fetch("/api/teacher/assessment/",{
        method:'POST',
        body: JSON.stringify({teacher_id: teacher_id,lesson_id:lessonmass.get(lesson),group_id:groupmass.get(group)}),
      })
      const assessmentgroup = await data.json()
      setShowtable(true)
      if(assessmentgroup!=undefined){
        setStudent(assessmentgroup)
      }
      const lesson_id = await assessmentgroup.assessmentGroup.id
      const data2 =await fetch("/api/teacher/dateforlesson/",{
        method:'POST',
        body: JSON.stringify({lesson_id: lesson_id}),
      })
      const date = await data2.json()
      if(date != undefined){
        setDate(date)
      } 
      }catch(err){
          console.log(err)
      }
  } 

  return (
    <>
    <div className="flex  overflow-x-hidden overflow-y-auto  inset-0  outline-none focus:outline-none">
    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
    <div>
    <div>
    <input type='search' list="lessons" placeholder="Выберите предмет" onChange={(e)=> handleLesson(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
        <datalist id="lessons">
            <>
            {lessons.map((lessons:any,index:any) => {
                    lessonmass.set(`${lessons.specialization.lesson_name}`,lessons.lesson_id)
            return (
                <option key={index}>{lessons?.specialization.lesson_name} </option>

            );
            })}
            </>
        </datalist>
    </div>
    </div>
    <input type='search' list="group" placeholder="Выберите предмет" onChange={(e)=> handleGroup(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
        <datalist id="group">
            <>
            {groups.map((group:any,index:any) => {
            groupmass.set(`${group.group?.group_name}`,group.group?.id)
            return(
                  <option key={index} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>{handleGroup(group.group?.group_name)}}>{group.group?.group_name}</option>
            );
            })}       
            </>
        </datalist>
       
    <div>
      <input type="month" onChange={(e)=>handleDate(new Date(e.target.value))}/>
    </div>
      {showtable ?(
      <>
      <div>
      <table >
            <thead>
                <tr>
                    <th>Студент</th>
                    {date.map((date:any,index:any) => {
                      const date2 = new Date(date.date).getDate();
                      return(
                          <th key={index}>{date2}</th>
                      );
                      })}
                      <th>ср.знач</th>

                </tr>
            </thead>
            <tbody>
            {students.students.students.map((student:any) => {
            return(
                <> 
                  <tr>
                  <td>{student.full_name}</td>
                   {date.map((date:any) => {
                     return(
                        <> 
                        <td>
                          <button type="button" onClick={(e)=> giveModal(date.id,student.id,student.full_name,date.date)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow"> 
                          {student.assessments.map((assessments:any) => { 
                              return(
                                <>
                                {assessments.assessments.map(((assessment:any,index:any) => {
                                  if(date.id == assessment.date_id){
                                    if(assessments.assessments.length -1 === index){
                                      return(
                                        <>
                                        <span>{assessment.number}</span>
                                        </>
                                      );
                                    }else{
                                      return(
                                        <>
                                        <span>{assessment.number}</span>
                                        </>
                                      );
                                    }
                                  }
                                }))}
                                </>
                              )
                          })}
                          </button>
                        </td>
                        </>
                      );
                  })} 
                  
                  </tr>
                  
                </>
            );
            })
            }
            </tbody>
      </table>
      </div>
      </>
      ):null}
       {showmodal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{studentName}</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowmodal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                   <label>выставление оценок</label>
                   <div>
                   <button type="button" onClick={() => createassesment("н")}  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          н
                    </button>
                   <button type="button" onClick={() => createassesment("2")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          2
                    </button>
                    <button type="button" onClick={() => createassesment("3")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          3
                    </button>
                    <button type="button" onClick={() => createassesment("4")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          4
                    </button>
                    <button type="button" onClick={() => createassesment("5")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          5
                    </button>
                    <button type="button" onClick={() => createassesment("Зач")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          Зач
                    </button>
                   </div>
                   <div>
                   <div>
                   <label>оценки</label>
                   </div>
                   {assessmentStudent.assessments ? (assessmentStudent.assessments.map((data:any) => {
                    if(assesment_id == data.date_id){
                      return(
                        <> 
                          <button type="button" onClick={() => deleteassesment(data.id)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-3 border border-gray-400 rounded shadow">          
                          {data.number}
                          </button>
                        </>
                      );
                    }
                     
                  })):null}
                   </div>
                </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowmodal(false)}
                  >
                    закрыть
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                  >
                    подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </form>   
    </div>
      
    </>
  );
};

export default JurnalModal;