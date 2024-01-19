import { getTeacher2 } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const teachers = await getTeacher2(body.date)
    return new Response(JSON.stringify({teachers}))
}
