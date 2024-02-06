
import { getgrouplist } from "@/app/actions/jurnal/teacher/getgroup"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getgrouplist(body.teacher_id,body.lesson_id)
    return new Response(JSON.stringify(lessons))
}
