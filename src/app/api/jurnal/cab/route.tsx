
import { NextRequest } from "next/server"
import { lessonsfromgroup } from "@/app/actions/schedule/lessonsfromgroup";
import { getcab } from "@/app/actions/schedule/gecab";
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const lessons = await getcab()
    return new Response(JSON.stringify(lessons))
}