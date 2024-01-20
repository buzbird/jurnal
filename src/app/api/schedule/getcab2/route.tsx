import { getCab2 } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const cab = await getCab2(body.date)
    return new Response(JSON.stringify({cab}))
}
