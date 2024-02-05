
import { NextRequest } from "next/server"
// import { CreateManydateOflessons } from "@/app/actions/schedule/createDateofLesson";

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    let lesson = body.lesson
    console.log(lesson)
    // await CreateManydateOflessons(lesson)
    return new Response()
}