
import { NextRequest } from "next/server"
import { createDateofLesson } from "@/app/actions/schedule/createDateofLesson";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    console.log(body.lesson)
    return new Response()
}