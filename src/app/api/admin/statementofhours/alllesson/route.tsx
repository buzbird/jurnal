import { getAllLesson } from '@/app/actions/admin/lessons/getalllessons';

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const data =await  getAllLesson()
    return new Response(JSON.stringify(data))
}