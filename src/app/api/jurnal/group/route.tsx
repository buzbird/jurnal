
import { NextRequest } from "next/server"
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import { getcab, getcab2 } from "@/app/actions/schedule/gecab";
import { getgroup } from "@/app/actions/schedule/gegroup";
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const groups = await getgroup(body.date)
    return new Response(JSON.stringify(groups))
}