import { getGroups } from "@/db/fetch"
import { group } from "console"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const group = await getGroups()
    console.log(group)
    return new Response(JSON.stringify({data:{group:group}}))
}
