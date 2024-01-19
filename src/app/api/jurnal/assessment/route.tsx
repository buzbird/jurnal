import { deleteAssesment,CreateAssesment} from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("it's work")
}
export async function POST(req:NextRequest){
    const body = await req.json()
    const data = await CreateAssesment(body.number,body.student_id, body.lesson_id)
    console.log(data)
    return new Response(JSON.stringify(data))
}
export async function DELETE(req:NextRequest){
    const body = await req.json()
    const data = await deleteAssesment(body.id)
    return new Response(JSON.stringify(data))
}
