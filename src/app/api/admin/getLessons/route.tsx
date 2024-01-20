import { getAllLessons } from "@/db/fetch"

import { NextRequest } from "next/server"
export async function POST(req:NextRequest) {
    const lessons = await getAllLessons()
    return new Response(JSON.stringify({lessons}))
}
