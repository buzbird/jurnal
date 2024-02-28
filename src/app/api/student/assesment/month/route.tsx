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
    let j = 0;
    const lessons = body.lesson
    let assesment:any[] = [];
    while(lessons.length > j){
        console.log(lessons)
        const lesson = await getdateOfLessonsforStudent(lessons[j].id,endDate,startDate,body.student_id)
        const assesments = await getassesmentforStudent(lessons[j].id,endDate,startDate,body.student_id)

        let numbers:any[] = []
        let i = 1;
        let index2 = false;
        let index3 = 0;
        lesson.map((lesson:any)=>{
            
            numbers.map((number:any,index:any)=>{
                if(new Date(number.date).toISOString() == new Date(lesson.date).toISOString()){
                    index3 = index
                    index2= true
                }
            })
            if(index2){
                index2= false
            }else{
                if(numbers.length < i){
                    numbers.push({date:lesson.date, numbers:[]})
                    i = i+1
                }
            }

        })
        assesments.map((asses:any)=>{
            numbers.map((number:any,index:any)=>{
                if(new Date(number.date).toISOString() == new Date(asses.lesson.date).toISOString()){
                    index3 = index
                    index2= true
                }
            })
            if(index2){
                numbers[index3].numbers.push(asses.number) 
                index2= false
            }else{
               
            }
        })
        assesment.push({lesson:lessons[j],assesments:numbers})
        j = j+1
    }
    console.log(assesment)
    return new Response(JSON.stringify({assesment:assesment}))//
}