
import { NextRequest } from "next/server"
import { getLessonId2 } from "@/app/actions/schedule/getlessonid/getlessonid";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lesson_id = await getLessonId2(body.id,body.lesson)
    console.log(lesson_id)
    return new Response(JSON.stringify({lesson_id}))
}