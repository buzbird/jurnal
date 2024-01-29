'use client'
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
            <th>{day}</th>
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
  return(
    <>
      {
        dates.map((date:any) =>{
          if(new Date(date).getDay() == 0){
            return(
              <><td className='pn'>в</td></>
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
              <td className='pn'></td>
              </>
            )
          }else{
            return(
              <>
              <td className='pn'>
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
      a= a + data.hours
      b = b + data.dm *2
    }

  })
  c = a -b
  return(
    <>
      <td className='pn'></td>
      <td className='pn'></td>
      <td className='pn'>итого</td>
      <td className='pn'>{a}</td>
      {
        dates.map((date:any) =>{
          return(
            <>
            <td className='pn'></td>
            </>
          )
        })
      }
      <td className='pn'>{b}</td>
      <td className='pn'>{c}</td>
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
    lesson = await lessonmass.get(lesson)
    Setlesson_id(lesson)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson,date:date}),
    })
    let data = await lessons.json()
    SetData(data)
  }
  const DateHandler = async(date:any) =>{
    SetDate(date)
    const lessons = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await lessons.json()
    SetData(data)
  }
  const GroupHandler = async(group:any) =>{
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
    let json = await fetch("/api/admin/statementofhours/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    let data = await json.json()
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
    await Setlessons(data)
    json = await fetch("/api/admin/statementofhours/allteacher/",{
      method:'POST',
      body: JSON.stringify({teacher:teacher,group:group,lesson:lesson_id,date:date}),
    })
    data = await json.json()
    await Setteahers(data)
   
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
    <table className='tab'>
            <thead>
                <tr>
                    <th >Группы</th>
                    <th>Учебная дисциплина</th>
                    <th>ФИО преподавателя</th>
                    <th>ВП</th>
                    <Dates month={date.getMonth()}/>
                    <th>ДМ</th>
                    <th>Ост</th>
                </tr>
            </thead>
            <tbody>
            {data2.map((data:any) => {
            return (
                    <>
                    <tr>
                       <td  className='pn'> {data.group.group_name}</td>
                       <td  className='pn'>{data.specialization.lesson_name}</td>
                       <td  className='pn'>{data.teacher.user.full_name}</td>
                       {data.group.is_y ? (<><td className='pn'>0</td></>) : (<><td  className='pn'>{data.hours}</td></>)}
                       <Stateinday month={date.getMonth()} dateoflessons={data.dateoflessons}/>
                       {data.group.is_y ? (<><td className='pn'>0</td></>) : (<><td className='pn'>{data.dm *2}</td></>)}
                       <td className='pn'>{data.ost}</td>
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
      <button className='load' onClick={start}>загрузить</button>
    </>)}
    </>
  )
}

export default Statementofhour