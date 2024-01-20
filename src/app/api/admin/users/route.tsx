import Admin from "@/app/admin/page"
import TheHeader from "@/app/components/TheHeader"
import { getUsers } from "@/db/fetch"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"

export async function POST(req:NextRequest) {
    const body = await req.json()
    const users = await getUsers()
    return new Response(JSON.stringify({data:{users:users}}))
}
