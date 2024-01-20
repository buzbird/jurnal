import { Teacher } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const teacher = await Teacher(body.teacher_id)
    return new Response(JSON.stringify({teacher:teacher}))
}
