import Admin from "@/app/admin/page"
import TheHeader from "@/app/components/TheHeader"
import { GetPermission } from "@/db/fetch"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const permission = await GetPermission(body.email)
    return new Response(JSON.stringify(permission))
}
