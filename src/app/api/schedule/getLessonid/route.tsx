import { getLessonId } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getLessonId(body.group_id,body.lesson_name)
    return new Response(JSON.stringify({lessons}))
}
