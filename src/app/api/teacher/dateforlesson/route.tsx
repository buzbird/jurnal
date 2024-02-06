
import { NextRequest } from "next/server"
import { getDateforlesson } from "@/app/actions/jurnal/teacher/getDateforlesson";
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    console.log(body.lesson_id)
    const lessons = await getDateforlesson(body.lesson_id)
    return new Response(JSON.stringify(lessons))
}
