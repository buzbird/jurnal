
import { NextRequest } from "next/server"
import { createDateofLessonMany } from "@/app/actions/schedule/createDateofLessonMany";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    console.log(body.lesson)
    body.lesson.map((lesson:any)=>{
        createDateofLessonMany(lesson,body.group_id)
    })
    console.log(body.group_id)
    return new Response()
}