
import { NextRequest } from "next/server"
import { Getassessmentgroup } from "@/app/actions/jurnal/teacher/getassessment";
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await Getassessmentgroup(body.teacher_id,body.lesson_id,body.group_id)
    return new Response(JSON.stringify(lessons))
}
