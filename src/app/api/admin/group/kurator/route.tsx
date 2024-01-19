import { getKuratorinGroup } from "@/db/fetch"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}

export async function POST(req:NextRequest) {
    const body = await req.json()
    const kurator = await getKuratorinGroup(body.id)
    console.log(kurator)
    return new Response(JSON.stringify({data:{kurator:kurator}}))

}