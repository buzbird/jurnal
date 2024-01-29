"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab2,getcab } from "@/app/actions/schedule/gecab";
import { getLessonId2 } from "@/app/actions/schedule/getlessonid/getlessonid";
import { DeleteLessons, getLessons2 } from "@/app/actions/schedule/getlessons";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import { getLessonId } from "@/db/fetch";
import React, { use, useEffect, useRef, useState } from "react";
const ScheduleTable = (data:any) => {
  let groupmass = new Map();
  const [lessonmass, setlessonmass] = useState(new Map());
  const [cabmass, setcabmass] = useState(new Map());
  const [date, setDate] = useState(new Date());
  const [group,setGroup] = useState("");
  const [tableviews,setTable] = useState(false);
  const [modal,setModal] = useState(false);
  const [lessonmodaldelete,setlessonmodaldelete] = useState({lesson_number:1,id:0,cabinet:{number:""},specialization:{specialization:{lesson_name:""},teacher:{user:{full_name:""}}}});
  const [lessons,setlessons]= useState([{}]);
  const [lesson2,setLessons2] = useState({lessons:[{}]})
  const [cabs,setCabs] = useState({cab:[{}]})
  const [showModal, setShowModal] = useState(false);
  const [lesson_number, setlesson_number] = useState(0);
  
  const [showModalgroup, setshowModalgroup] = useState(false);

  const [lesson,setLesson] = useState("");
  const [cabinet,setCabinet] = useState("");
  // запрос кабинетов
  const [groups,Setgroups] = useState({group:[]})
  const [group2,Setgroup] = useState("")

  const changDate = (date:any)=>{
    setDate(new Date(date))
    setTable(true)
  }
  const setmodalDelete = async(lesson:any)=>{
    setlessonmodaldelete(lesson)
    setModal(true)
  }
  const handleGroup = async(group:any) =>{
    await setGroup(group)
    let group_id = await groupmass.get(group)
    if(group_id != undefined){
      await getLesson(group_id)
    }else{
      setlessons([{}])
    }
  }
  const getLesson = async(group_id:any) =>{
    const lessons2 = await fetch("/api/jurnal/getlesson2/",{
      method:'POST',
      body: JSON.stringify({date:date,group_id:group_id}),
    })
    let data =await lessons2.json()
    setlessons(data)
  } 
  const createDateLesson2= async() =>{
    try {
      const lesson2 = await fetch("/api/jurnal/getlessonid2/",{
        method:'POST',
        body: JSON.stringify({id:groupmass.get(group2),lesson:lesson}),
      })
      let data =await lesson2.json()
      await fetch("/api/jurnal/createdateoflesson/",{
        method:'POST',
        body: JSON.stringify({id:data.lesson.id,lesson_number:lesson_number,date:date,cab:cabmass.get(cabinet)}),
      })
      setshowModalgroup(false);
      setShowModal(true);
    }catch(err){
        console.log(err)
    }
  }
  

  const addgroup = async(groupvission:any) =>{
    try {
      setShowModal(false)
      let group =await fetch("/api/jurnal/grouplist/",{
        method:'POST',
        body: JSON.stringify({}),
      })
      let data =await group.json()
      setshowModalgroup(groupvission)
      if(data != undefined){
        Setgroups(data)
      }
      
    }catch(err){
        console.log(err)
    }
  }
  const createDateLesson = async() =>{
    try {
      let les= await lessonmass.get(lesson)
      let cab = await cabmass.get(cabinet)
      await fetch("/api/jurnal/createdateoflesson/",{
        method:'POST',
        body: JSON.stringify({id:les,lesson_number:lesson_number,date:date,cab:cab}),
      })
      setShowModal(false);
      let id = await groupmass.get(group)
      getLesson(id)
    }catch(err){
        console.log(err)
    }
  }



  const m = [1,2,3,4,5,6]

  const setShowModals = async(lesson_numbers:any)=>{
    let group_id = await  groupmass.get(group);
    setlesson_number(lesson_numbers)
    const lessonslist = await fetch("/api/jurnal/lessonfromgroup",{
      method:'POST',
      body: JSON.stringify({group_id: group_id}),
    })
    let data = await lessonslist.json()
    let lessons = {lessons:[{}]}
    let cab = {cab:[{}]}
    if(data.lesson != undefined){
      data.lesson.map((lesson:any) => {
        lessonmass.set(`${lesson.specialization.lesson_name}`,lesson.id)
        lessons.lessons.push(lesson.specialization)
      })
    }
    setlessonmass(lessonmass)

    const cabsass = await fetch("/api/jurnal/cab",{
      method:'POST',
      body: JSON.stringify({}),
    })
    data = await cabsass.json()

    if(data != undefined){
      data.map((cabinet:any) => {
        cabmass.set(`${cabinet.number}`,cabinet.id)
        cab.cab.push(cabinet.number)
      })
    }
    
    cab.cab.splice(0,1)
    setcabmass(cabmass)

    setCabs(cab)
    setLessons2(lessons)
    setShowModal(true)

  }

  const deleteLesson = async(id:any,lesson_number:any) =>{
    let group_id = await  groupmass.get(group);
    await fetch("/api/jurnal/getlesson2/",{
      method:'DELETE',
      body: JSON.stringify({id:id}),
    })
    const lessons2= await fetch("/api/jurnal/getlesson2/",{
      method:'POST',
      body: JSON.stringify({date:date,group_id:group_id,lesson_number:lesson_number}),
    })
    let data =await lessons2.json()
    setlessons(data)
  }
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />
      
      {tableviews ? (
        <>
        <div>
          <ScheduleModelperCab date={date}/>
          <ScheduleModelperTeacher date={date}/>
          <div>{group}</div>
          <input type='search' list="groups" placeholder="Выберите группу" onChange={(e)=> handleGroup(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
          <datalist id="groups">
            <> 
            {data.data.map((group:any,index:any) => {
                    groupmass.set(`${group.group_name}`,group.id)
            return (
                <option key={index}>{group?.group_name} </option>

            );
            })}
            </>
        </datalist>
        </div>
        <table>
                    <thead>
                      <tr>
                        <th>
                          номер пары
                        </th>
                        <th>
                          предмет
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {m.map((i:any,index:any)=>{
                        let rowspanx = 2;
                        lessons.map((lesson:any)=>{
                          if(i==lesson.lesson_number){
                            rowspanx = rowspanx +1 
                          }
                        })
                        return(
                          <>
                          <tr>
                            <td rowSpan={rowspanx}>
                              {i}
                            </td>
                          </tr>
                          {lessons.map((lesson:any)=>{
                          if(i==lesson.lesson_number){
                          return(
                            <>
                            <tr>
                              <td><button
                              className="bg-blue-200 text-black active:bg-blue-500 
                            font-bold px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              onClick={() => setmodalDelete(lesson)}>
                              <div>
                              {lesson.specialization?.specialization?.lesson_name}
                              </div>
                              <div>
                                <span>{lesson.specialization?.teacher?.user?.full_name}</span>
                                <span>{lesson.cabinet?.number}</span>
                              </div>
                            </button></td>
                            </tr>
                            </>
                          )
                          }
                        })}
                        <tr>
                          <td>
                          <button
                          className="bg-blue-200 text-black active:bg-blue-500 
                        font-bold px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={() => setShowModals(i)}
                        >+
                      </button> 
                          </td>
                        </tr>
                          </>
                        )
                      })}
                      
                    </tbody>
                  </table>
        </>
      ):null

      }
{modal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{group}</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                   вы точно хотите удалить?
                <div>
                  {lessonmodaldelete.specialization?.specialization?.lesson_name}
              </div>
              <div>
                <span>{lessonmodaldelete.specialization?.teacher?.user?.full_name}</span>
                <span>{lessonmodaldelete.cabinet?.number}</span>
              </div>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    закрыть
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() =>   deleteLesson(lessonmodaldelete.id,lessonmodaldelete.lesson_number)}>
                    удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
          {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold"></h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">

                  <div>
                  1 урок
                  <input type='search' list="lessons" onChange={(e)=> setLesson(e.target.value)} placeholder="выберите предмет" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  <datalist id="lessons">
                      <>
                      {lesson2.lessons.map((lesson:any,index:any) => {
                      return (
                          <option key={index}>{lesson.lesson_name}</option>

                      );
                      })}
                      </>
                  </datalist>
                  <input type='search' list="cab" onChange={(e)=> setCabinet(e.target.value)} placeholder="свободные кабинеты" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  <datalist id="cab">
                  <>
                      {cabs.cab.map((cab:any,index:any) => {
                      return (
                          <option key={index}>{cab}</option>

                      );
                      })}
                      </>
                  </datalist>
                  </div>
                </form>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    закрыть
                  </button>

                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => addgroup(true)}
                  >
                    добавить группу
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => createDateLesson()}
                  >
                    добавить предмет
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

            
{showModalgroup ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-1 z-101 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">выберите группу</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <input type="search" list='group' placeholder='Фильтрация по Группам'  onChange={(e) =>{Setgroup(e.target.value)}}/>
                <datalist id="group">
                                  <>
                                  {groups.group.map((group:any,index:any)=>{
                                    groupmass.set(`${group.group_name}`,group.id)
                                    return(
                                      <>
                                        <option key={index}>{group.group_name}</option>
                                      </>
                                    )
                                  })
                                  }
                                  </>
                </datalist>
                </form>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setshowModalgroup(false)}
                  >
                    закрыть
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => createDateLesson2()}
                  >
                    добавить предмет
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const ScheduleModelperTeacher = ({date}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [teachersmass,setcabmasss] =useState(new Map()) ;
  const [teachers,setTeachers] = useState([{}])
  const getteachers =async(modal:any)=>{
    const teachers = await fetch("/api/jurnal/getteachers/",{
      method:'POST',
      body: JSON.stringify({date:date}),
    })
    let data = await teachers.json()

    await setTeachers(data)
    setShowModal(modal)
  }
  
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => getteachers(true)}
      >
        показать по преподавателям
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">расписание по кабинетам</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                <table>
                  <thead>
                    <tr>
                      <td>Кабинеты</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher:any) => {
                        return(
                          <>
                          <tr>
                            <td>
                                {teacher.teacher}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{

                              if(lesson.lesson_number === 1){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 2){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 3){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 4){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 5){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                            {teacher.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 6){
                                return(
                                  <>
                                  <div>
                                  {lesson.lesson_name} ({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                          </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
const ScheduleModelperCab = ({date}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [cabmass,setcabmasss] =useState(new Map()) ;
  const [cabs,setCabs] = useState([{}])
  const getcabs =async(modal:any)=>{
    const cabs2 = await fetch("/api/jurnal/cab2/",{
        method:'POST',
        body: JSON.stringify({date:date}),
      })
    let data = await cabs2.json()
    await setCabs(data)
    setShowModal(modal)
  }
  
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => getcabs(true)}
      >
        показать по кабинетам
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">расписание по кабинетам</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                <table>
                  <thead>
                    <tr>
                      <td>Кабинеты</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cabs.map((cabinet:any,index:any) => {
                        return(
                          <>
                          <tr key={index}>
                            <td key={index}>{cabinet.cabinet}</td>
                            <td>
                              {cabinet.lessons.map((lesson:any,index:any) =>{
                              if(lesson.lesson_number === 1){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                              {cabinet.lessons.map((lesson:any,index:any) =>{
                              if(lesson.lesson_number === 2){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                              {cabinet.lessons.map((lesson:any,index:any) =>{

                              if(lesson.lesson_number === 3){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                              {cabinet.lessons.map((lesson:any,index:any) =>{
                              if(lesson.lesson_number === 4){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                              {cabinet.lessons.map((lesson:any) =>{
                              if(lesson.lesson_number === 5){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                            <td>
                              {cabinet.lessons.map((lesson:any,index:any) =>{
                              if(lesson.lesson_number === 6){
                                return(
                                  <>
                                  <div key={index}>
                                  {lesson.lesson_name}({lesson.group_name})
                                  </div>
                                  </>
                                );
                              }
                              })}
                            </td>
                          </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const ScheduleModel = ({lesson_number,group,date}:any) => {


 

 
};

export default ScheduleTable;

