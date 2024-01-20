import { getSpecializations } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const specializations = await getSpecializations()
    console.log(specializations)
    return new Response(JSON.stringify({data:{specializations:specializations}}))
}
