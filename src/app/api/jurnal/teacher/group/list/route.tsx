import { TeachersGroupList } from "@/db/fetch";
import { group } from "console";
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const group =  await TeachersGroupList(body.teacher_id,body.lesson_id)
    console.log(group)
    return new Response(JSON.stringify(group))
}
