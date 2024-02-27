import { getAllTeachers2 } from '@/app/actions/admin/getTeachers/getallTeachers';

import { NextRequest } from "next/server"
export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const data = await getAllTeachers2()
    return new Response(JSON.stringify(data))
}