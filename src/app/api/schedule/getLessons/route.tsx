import { getLessons,DeleteLessonsSchedule } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getLessons(body.date,body.group_id,body.lesson_number)
    return new Response(JSON.stringify({lessons}))
}
export async function DELETE(req:NextRequest) {
    const body = await req.json()
    const lessons = await DeleteLessonsSchedule(body.id)
    return new Response(JSON.stringify({lessons}))
}
