
import { NextRequest } from "next/server"
import { CreateAssesment2, DeleteAssesment } from "@/app/actions/jurnal/assesment/assesment";
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await CreateAssesment2(body.number,body.student_id,body.lesson_id)
    return new Response(JSON.stringify(lessons))
}
export async function DELETE(req:NextRequest) {
    const body = await req.json()
    const lessons = await DeleteAssesment(body.assessment_id)
    return new Response(JSON.stringify(lessons))
}

