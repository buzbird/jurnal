import { getCab } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const cab = await getCab()
    return new Response(JSON.stringify({cab}))
}
