
import { NextRequest } from "next/server"
import { getTeachers } from "@/app/actions/schedule/gecabteachers";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const teachers = await getTeachers(body.date)
    console.log(teachers)
    return new Response(JSON.stringify(teachers))
}