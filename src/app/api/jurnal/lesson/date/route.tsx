import { gatelessondatefor } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("it's work")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    console.log(startDate,endDate)
    const data = await gatelessondatefor(body.lesson_id,endDate,startDate)
    return new Response(JSON.stringify({data:data}))
}
