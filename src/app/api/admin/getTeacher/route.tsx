import { getAllTeachers } from "@/db/fetch"

import { NextRequest } from "next/server"
export async function POST(req:NextRequest) {
    const body = await req.json()
    const teachers = await getAllTeachers()
    return new Response(JSON.stringify({teachers}))
}
