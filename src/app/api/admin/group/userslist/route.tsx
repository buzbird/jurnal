import { GetUserbyGroup,getGroups } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const group = await getGroups()
    const usersinGroup = await GetUserbyGroup(group)
    return new Response(JSON.stringify({data:{group:usersinGroup}}))
}
