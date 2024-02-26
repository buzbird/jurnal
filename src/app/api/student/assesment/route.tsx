import { NextRequest } from "next/server"
import { getLessonFromDate, getdateOfLessonsforStudent ,getassesmentforStudent} from "@/db/fetch"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const date = new Date(body.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    const lesson = await getdateOfLessonsforStudent(body.lesson_id,endDate,startDate,body.student_id)
    const lessons = await getdateOfLessonsforStudent(body.lesson_id,endDate,startDate,body.student_id)
    const assesments = await getassesmentforStudent(body.lesson_id,endDate,startDate,body.student_id)
    console.log(assesments)
    let assesment:any[] = [];
    let numbers:any[] = []
    let i = 1;
    let index2 = false;
    let index3 = 0;
    assesments.map((asses:any)=>{
        numbers.map((number:any,index:any)=>{
            if(number.lesson_id == asses.lesson_id){
                index3 = index
                index2= true
            }
        })
        if(index2){
            numbers[index3].numbers.push(asses.number) 
            index2= false
        }else{
            if(numbers.length < i){
                numbers.push({lesson_id:asses.lesson_id, numbers:[asses.number]})
                i = i+1
            }
        }
    })
    lessons.map((lesson:any)=>{
        let numbers:any[] = [];
       assesment.push({date:lesson.date,})
    })
    return new Response(JSON.stringify({lessons:lessons,assesment:numbers}))//
}
