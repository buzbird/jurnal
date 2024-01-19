"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import { Clearcache } from "@/app/actions/clearcache/clearcache";
import { getgrouplist } from "@/app/actions/jurnal/teacher/getgrouplist";
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";
import { getcab2,getcab } from "@/app/actions/schedule/gecab";
import { getTeachers } from "@/app/actions/schedule/gecabteachers";
import { getLessonId2 } from "@/app/actions/schedule/getlessonid/getlessonid";
import { DeleteLessons, getLessons } from "@/app/actions/schedule/getlessons";
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import { getLessonId } from "@/db/fetch";
import React, {  useState } from "react";
const ScheduleTable = (data:any) => {
  const [date, setDate] = useState(new Date());
  const [tableviews,setTable] = useState(false)
  const changDate = (date:any)=>{
    Clearcache("/schedule/")
    setDate(new Date(date))
    setTable(true)
    
  }
  const m = [1,2,3,4,5,6]
  return (
    <>
      <input type="date" onChange={(e)=> changDate(e.target.value)} />
      
      {tableviews ? (
        <>
        <div>
          <ScheduleModelperCab date={date}/>
          <ScheduleModelperTeacher date={date}/>
        </div>
        <table>
        <thead>
          <tr>
          <th></th>
          {data.data.groups.map((group:any,index:any) => {
            return(
              <th key={group.id}>{group.group_name}</th>
            );
            })}   
          </tr>  
        </thead>
        <tbody>
      {m.map((i:any,index:any)=>{
          return(
          <tr key={index}>
            <td>{i}</td>
            {data.data.groups.map((group:any,index:any) => { 
            return(
                  <td key={index}>
                    {/* <ScheduleModel lesson_number={i} group={group} date={date}/> */}
                  </td>
            );
            })} 
          </tr>
          );
      })}
        </tbody> 
      </table>
        </>
      ):null

      }
    </>
  );
};

const ScheduleModelperTeacher = ({date}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [teachersmass,setcabmasss] =useState(new Map()) ;
  const [teachers,setTeachers] = useState([{}])
  const getteachers =async(modal:any)=>{
    const teachers = await getTeachers(date)
    await setTeachers(teachers)
    console.log(teachers)
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
                                console.log(lesson)
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
                                console.log(lesson)
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
                                console.log(lesson)
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
                                console.log(lesson)
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
                                console.log(lesson)
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
                                console.log(lesson)
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
    const cabsass = await getcab2(date)
    await setCabs(cabsass)
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
  const [showModalgroup, setshowModalgroup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [secondlesson,setSecondLesson] = useState(false);
  const [lesson,setLesson] = useState("");
  const [cabinet,setCabinet] = useState("");
  // запрос кабинетов
  const [lessonmass,setlessonmass] =useState(new Map()) ;
  const [cabmass,setcabmasss] =useState(new Map()) ;
  let groupnmass = new Map();
  const [groups,Setgroups] = useState({groups:[]})
  const [group2,Setgroup] = useState("")
  const [lessons,setLessons] = useState({lessons:[{}]})
  const [cabs,setCabs] = useState({cab:[{}]})
  const setShowModals = async(modal:any)=>{
    const lessonslist = await lessonsfromgroup(group.id)
    let lessons = {lessons:[{}]}
    let cab = {cab:[{}]}
    lessonslist.groups.map((lesson:any) => {
      lessonmass.set(`${lesson.specialization.lesson_name}`,lesson.id)
      lessons.lessons.push(lesson.specialization)
    })
    const cabsass = await getcab()
    
    cabsass.cab.map((cabinet:any) => {
      cabmass.set(`${cabinet.number}`,cabinet.id)
      cab.cab.push(cabinet.number)
    })
    cab.cab.splice(0,1)
    setCabs(cab)
    setLessons(lessons)
    setShowModal(modal)
    console.log(cabs)
  }
  
  const addgroup = async(groupvission:any) =>{
    try {
      setShowModal(false)
      let data =await getgrouplist()
      setshowModalgroup(groupvission)
      Setgroups(data)
      
    }catch(err){
        console.log(err)
    }
  }
  const createDateLesson = async() =>{
    try {
      console.log(lessonmass)
      console.log(cabmass)
      console.log(lessonmass.get(lesson),cabmass.get(cabinet))
      createDateofLesson(lessonmass.get(lesson),lesson_number,date,cabmass.get(cabinet))
      setShowModal(false);
      getLesson();
    }catch(err){
        console.log(err)
    }
  }
  const createDateLesson2= async() =>{
    try {
      console.log(group2,groupnmass.get(group2),lesson)
      const lesson2 = await getLessonId2(groupnmass.get(group),lesson)
      console.log(lesson2.lessons.id,lesson_number,date,cabmass.get(cabinet))
      createDateofLesson(lesson2.lessons.id,lesson_number,date,cabmass.get(cabinet))
      setshowModalgroup(false);
      setShowModal(true);
      getLesson();  
    }catch(err){
        console.log(err)
    }
  }
  const [lessonss, setlessons] = useState({lessons:[]});
  const [modal,setmodal] = useState(false)
  const getLesson = async() =>{
    const lessons2 = await getLessons(date,group.id,lesson_number)
    await setlessons(lessons2)
  }   
  const deleteLesson = async(id:any) =>{
    await DeleteLessons(id)
    const lessons3 = await getLessons(date,group.id,lesson_number)
    await setlessons(lessons3)
  }
  useState((() => {
    getLesson();
  }))
  // useEffect(() => {
  //   getLesson();  // this will fire only on first render
  // }, [getLesson]);
  return (
    <>
    {lessonss.lessons.map((lesson:any,index:any) => {
            return(
                <> 
                 <tr key={index}>
                 <button
              className="bg-blue-200 text-black active:bg-blue-500 
            font-bold px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setmodal(true)}
            >
              <div>
              {lesson.specialization.specialization.lesson_name}
              </div>
              <div>
                <span>{lesson.specialization.teacher.user.full_name}</span>
                <span>{lesson.cabinet.number}</span>
              </div>
                </button>

                {modal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{group.group_name}</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setmodal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div>
                вы точно хотите удалить?
                <div>
              {lesson.specialization.specialization.lesson_name}
              </div>
              <div>
                <span>{lesson.specialization.teacher.user.full_name}</span>
                <span>{lesson.cabinet.number}</span>
              </div>
                </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setmodal(false)}
                  >
                    закрыть
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() =>   deleteLesson(lesson.id)}
                  >
                    удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
                 </tr>
                </>
            );
    })} 
        <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModals(true)}
      >+
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">{group.group_name}</h3>
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
                      {lessons.lessons.map((lesson:any,index:any) => {
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
                                  {groups.groups.map((group:any,index:any)=>{
                                    groupnmass.set(`${group.group_name}`,group.id)
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
    </>
  );
};

export default ScheduleTable;

