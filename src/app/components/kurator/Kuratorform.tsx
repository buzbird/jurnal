'use client'
import React, { useState } from 'react'

const Kuratorform = ({kurator,groups}:any) => {
    let groupmass = new Map();
    let studentsmass = new Map();
    
    const [view,setview] = useState(false)
    const [students,setStudents] = useState({students:[]})
    const [student,setStudent] = useState("")
    const [lesson,setLesson] = useState("")
    const [group,setgroup] = useState("")
    const [date2,setDate2] = useState(new Date())
    const [viewdate,setviewdate] = useState(false)
    const [ViewsMonthalllesson,setViewsMonthalllesson] = useState(false)
    const [assesments,setAssesments] = useState({lessons:[],assesment:[]})
    const [assesments2,setAssesments2] = useState({assesment:[]})
    const [tablev,settablev] = useState(false)




    const changeGroup = async(group:any) =>{
      setgroup(group)
      const groups = await fetch("/api/kurator/students/",{
        method:'POST',
        body: JSON.stringify({kurator_id: kurator.kurator_id,group_id:groupmass.get(group)}),
      })
      const data =await groups.json()
      setStudents(data)
      setview(true)
      setStudent("")
      settablev(false)
    }

    const StudentHandler = async(student:any) =>{
      setStudent(student)
      setviewdate(true)
      if(student == ""){settablev(false)}else{
        if(date2 == null){}else{
          const lessons = await fetch("/api/kurator/students/lessons/",{
            method:'POST',
            body: JSON.stringify({group_id: groupmass.get(group)}),
        })
          const data2 = await lessons.json()
          await setDate2(new Date(date2))
            const lessons2 = await fetch("/api/student/assesment/month/",{
              method:'POST',
              body: JSON.stringify({lesson:data2,group_id: groupmass.get(group),date: date2,student_id:studentsmass.get(student)}),
          })
            const data = await lessons2.json()
            setAssesments2(data)
            settablev(true)
        }
      }
    }
    const changeDate2 = async(date:any) =>{
      if(student == ""){  if(date==""){await setDate2(new Date())}else{await setDate2(new Date(date))}}else{
        if(date==""){await setDate2(new Date())}else{
          settablev(false)
          const lessons = await fetch("/api/kurator/students/lessons/",{
            method:'POST',
            body: JSON.stringify({group_id: groupmass.get(group)}),
        })
          const data2 = await lessons.json()
          await setDate2(new Date(date))
            const lessons2 = await fetch("/api/student/assesment/month/",{
              method:'POST',
              body: JSON.stringify({lesson:data2,group_id: groupmass.get(group),date: date,student_id:studentsmass.get(student)}),
          })
            const data = await lessons2.json()
            setAssesments2(data)
            settablev(true)
        }
      }
      
    }
  return (
    <div>
        <div>
          {groups.map((group:any,index:any)=>{
            groupmass.set(`${group.group_name}`,group.id)
            return (<button onClick={()=>{changeGroup(group.group_name)}} key={index} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-2 border border-blue-500 hover:border-transparent rounded">{group.group_name}</button>)
          })}
        </div>
        <div>
          { view ? (<>
          
            <input type="search" className="w-1/4" list='students'value={student} placeholder='Выберите студента'onChange={(e) =>{StudentHandler(e.target.value)}} />
            <datalist id="students">
              {students.students.map((student:any,index:any)=>{
                studentsmass.set(`${student.user?.full_name}`,student.id)
                return(
                  <>
                    <option key={index}>{student.user?.full_name}</option>
                  </>
                )
              })
              }
  
            </datalist>
            {viewdate ?(

              <>
              <input type="month" className="w-1/4"  onChange={(e) =>{changeDate2(e.target.value)}}/>
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
              </>

            ):null}
          </>):null}
        </div>
    </div>
  )
}
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

export default Kuratorform