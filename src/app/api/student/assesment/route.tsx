import { getLessonFromDate, getdateOfLessonsforStudent ,getassesmentforStudent} from "@/db/fetch"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    
    console.log(body.student_id,body.lesson_id,body.date,body.group_id)

    const date = new Date(body.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const lessons =await getdateOfLessonsforStudent(body.lesson_id,endDate,startDate)
    console.log(lessons)
    let assesment:any[] = [];
    await lessons.map(async(lesson:any)=>{
        let assesmentfordate :any[] = [];
        const assesments = await getassesmentforStudent(lesson.id,body.student_id)
        console.log(assesments)
        
        assesments.map((assesment:any)=>{
            assesmentfordate.push(assesment.number)
        })
        assesment.push({date:lesson.date, assesment:assesmentfordate})
        console.log(assesment)
    })
    // const lessons = await getLessonFromDate(body.lesson_id,body.date)
    return new Response(JSON.stringify(assesment))//
}
