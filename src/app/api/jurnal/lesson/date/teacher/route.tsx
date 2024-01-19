import { gatelessondateforteacher } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function POST(req:NextRequest) {
    const body = await req.json()
    const data = await gatelessondateforteacher(body.date,body.teacher_id,)
    return new Response(JSON.stringify({lessons:data}))
}
