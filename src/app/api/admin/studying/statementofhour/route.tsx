
import { GetAllStatemnt } from "@/db/fetch"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const data  = await GetAllStatemnt(body.teacher_id,body.group_id,body.lesson_id)
    return new Response(JSON.stringify(data))
}
