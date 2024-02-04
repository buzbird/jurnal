import { UpdateLessons } from "@/app/actions/schedule/getlessons";

import { NextRequest } from "next/server"
import { getTeachers } from "@/app/actions/schedule/gecabteachers";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await UpdateLessons(body.id,body.lesson_number, body.lesson,body.cab)
    console.log(lessons)
    return new Response(JSON.stringify(lessons))
}