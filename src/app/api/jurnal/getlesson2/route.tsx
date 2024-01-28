import { DeleteLessons, getLessons2 } from "@/app/actions/schedule/getlessons";

import { NextRequest } from "next/server"
import { getTeachers } from "@/app/actions/schedule/gecabteachers";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getLessons2(body.date,body.group_id)
    console.log(lessons)
    return new Response(JSON.stringify(lessons))
}
export async function DELETE(req:NextRequest) {
    const body = await req.json()
    await DeleteLessons(body.id)
    return new Response()
}