
import { NextRequest } from "next/server"
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    let lesson = body.lesson
    lesson.map((lessons:any)=>{
        createDateofLesson(lessons.specialization.id,body.lesson_number,body.date,body.cab)lesson_id,lesson_number,date,cabinet_number
    })
    console.log(lesson)
    // 
    return new Response()
}