'use client'
import { Clearcache } from '@/app/actions/clearcache/clearcache';
import React, { useContext, useState } from 'react'
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
        dates.map((date:any) =>{
          const day = new Date(date).getDate()
          return(
            <>
            <th className='border-solid border-2 border border-slate-500'>{day}</th>
            </>
          )
        })
      }
    </>
  )
}

function Stateinday({month,dateoflessons}:any){
  const dates: Date[] = [];
  const currentDate = new Date(new Date().getFullYear(),month); // Month argument is 0-based()
  while (currentDate.getMonth() ===  month) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log(dateoflessons)
  return(
    <>
      {
        dates.map((date:any) =>{
          if(new Date(date).getDay() == 0){
            return(
              <><td className='border-solid border-2 border border-slate-500'>в</td></>
            )
          }else{
            let count = 0;
          dateoflessons.map((dateoflesson:any)=>{
            if(new Date(dateoflesson.date).getDate()=== date.getDate()){
              count = dateoflesson.count
            }
          })
          if(count == 0){
            return(
              <>
              <td className='border-solid border-2 border border-slate-500'></td>
              </>
            )
          }else{
            return(
              <>
              <td>
                {count*2 }
              </td>
              </>
            )
          }
          }
        })
      }
    </>
  )
}
function Itog({month,data}:any){
  const dates: Date[] = [];
  const currentDate = new Date(new Date().getFullYear(),month); // Month argument is 0-based()
  while (currentDate.getMonth() ===  month) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  let a=0,b=0,c;
  data.map((data:any) => {
    if(data.group.is_y){}else{
      a=a+ data.hours
      b = b + data.dm *2
    }

  })
  c = a -b
  return(
    <>
      <td></td>
      <td></td>
      <td className='border-solid border-2 border border-slate-500'>итого</td>
      <td className='border-solid border-2 border border-slate-500'>{a}</td>
      {
        dates.map((date:any) =>{
          return(
            <>
            <td ></td>
            </>
          )
        })
      }
      <td className='border-solid border-2 border border-slate-500'>{b}</td>
      <td className='border-solid border-2 border border-slate-500'>{c}</td>
    </>
  )
}

function Statementofhour() {
  const [tableviews,Settableviews] = useState(false)
  const [date,SetDate] = useState(new Date())
  let groupnmass = new Map();
  let teachermass = new Map();
  let lessonmass = new Map();
  const [lessons,Setlessons] = useState([{}])
  const [lesson_id,Setlesson_id] = useState(undefined)
  const [groups,Setgroups] = useState([{}])
  const [group,Setgroup] = useState(undefined)
  const [teachers,Setteahers] = useState([{}])
  const [teacher,Setteaher] = useState(undefined)
  const [data2,SetData] =useState([])

  const TeaherHandler = async(teacher:any) =>{
    Clearcache("/admin/studying/statementofhours")
    teacher = await teachermass.get(teacher)
    Setteaher(teacher)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson_id:lesson_id,date:date}),
    })
    let data = await lessons.json()
    
    SetData(data)
  }
  const LessonHandler = async(lesson:any) =>{
    Clearcache("/admin/studying/statementofhours")
    lesson = await lessonmass.get(lesson)
    Setlesson_id(lesson)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await lessons.json()
    SetData(data)
  }
  const DateHandler = async(date:any) =>{
    Clearcache("/admin/studying/statementofhours")
    SetDate(date)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await lessons.json()
    SetData(data)
  }
  const GroupHandler = async(group:any) =>{
    Clearcache("/admin/studying/statementofhours")
    group = await groupnmass.get(group)
    Setgroup(group)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await lessons.json()
    SetData(data)
  }
  const start = async() =>{
    Clearcache("/admin/studying/statementofhours")
    let json = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await json.json()
    console.log(data)
    await SetData(data)
    json = await fetch("/api/admin/statementofhours/grouplist/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    data = await json.json()
    await Setgroups(data)
    json = await fetch("/api/admin/statementofhours/alllesson/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    data = await json.json()
    Setlessons(data)
    json = await fetch("/api/admin/statementofhours/allteacher/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    data = await json.json()
    Setteahers(data)
   
    Settableviews(true)
  }
  return (
    <>  
{tableviews ? (
      <>
      <div>
      <input type="search" list='group' placeholder='Фильтрация по Группам'  onChange={(e) =>{GroupHandler(e.target.value)}}/>
    <datalist id="group">
                      <>
                      {groups.map((group:any)=>{
                        groupnmass.set(`${group.group_name}`,group.id)
                        return(
                          <>
                            <option>{group.group_name}</option>
                          </>
                        )
                      })
                      }
                      </>
    </datalist>
    <input type="search" list='lesson' placeholder='Фильтрация по предметам'onChange={(e) =>{LessonHandler(e.target.value)}} />
    <datalist id="lesson">
                      <>
                      {lessons.map((lesson:any)=>{
                        lessonmass.set(`${lesson.lesson_name}`,lesson.id)
                        return(
                          <>
                            <option>{lesson.lesson_name}</option>
                          </>
                        )
                      })
                      }
                      </>
    </datalist>
    <input type="search" list='teacher' placeholder='Фильтрация по преподавателю' onChange={(e) =>{TeaherHandler(e.target.value)}} />
    <datalist id="teacher">
      {teachers.map((teacher:any) =>{
      teachermass.set(`${teacher.user.full_name}`,teacher.teacher_id)
      return(
        <>
          <option>{teacher.user.full_name}</option>
        </>
      )
    })}
  </datalist>
    <input type="month" onChange={(e) =>{DateHandler(new Date(e.target.value))}}/>
    </div>
    <table className='border-solid border-2 border border-slate-500 table-auto'>
            <thead className='border-solid border-2 border border-slate-500 table-auto'>
                <tr>
                    <th  className='border-solid border-2 border border-slate-500'>Группы</th>
                    <th className='border-solid border-2 border border-slate-500'>Учебная дисциплина</th>
                    <th className='border-solid border-2 border border-slate-500'>ФИО преподавателя</th>
                    <th className='border-solid border-2 border border-slate-500'>ВП</th>
                    <Dates month={date.getMonth()}/>
                    <th className='border-solid border-2 border border-slate-500'>ДМ</th>
                    <th className='border-solid border-2 border border-slate-500'>Ост</th>
                </tr>
            </thead>
            <tbody>
            {data2.map((data:any) => {
              console.log(data.group.is_y)
            return (
                    <>
                    <tr className='border-solid border-2 border border-slate-500 table-auto hover:bg-sky-200'>
                       <td className='border-solid border-2 border border-slate-500'> {data.group.group_name}</td>
                       <td className='border-solid border-2 border border-slate-500'>{data.specialization.lesson_name}</td>
                       <td className='border-solid border-2 border border-slate-500'>{data.teacher.user.full_name}</td>
                       <td className='border-solid border-2 border border-slate-500'>{data.hours}</td>
                       <Stateinday month={date.getMonth()} dateoflessons={data.dateoflessons}/>
                       {data.group.is_y ? (<><td>0</td></>) : (<><td>{data.dm *2}</td></>)}
                       <td className='border-solid border-2 border border-slate-500'>{data.ost}</td>
                    </tr>
                    </>
                    );
            })}
            <tr>
            <Itog month={date.getMonth()} data={data2}/>
            </tr>
            </tbody>
    </table>
      </>

    ): (<>
      <button onClick={start}>загрузить</button>
    </>)}
    </>
  )
}

export default Statementofhour