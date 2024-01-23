
import { NextRequest } from "next/server"
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await lessonsfromgroup(body.group_id)
    console.log(lessons)
    return new Response(JSON.stringify({lesson:lessons}))
}