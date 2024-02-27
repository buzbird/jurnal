import { getLessonFromDate } from "@/db/fetch"
import { NextRequest } from "next/server"


export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getLessonFromDate(body.date,body.group_id)
    return new Response(JSON.stringify(lessons))
}
