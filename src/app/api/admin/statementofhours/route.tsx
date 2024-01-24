import { deleteuser } from "@/app/actions/admin/users/deleteuser"
import { updateuser } from "@/app/actions/admin/users/updateuser"
import Admin from "@/app/admin/page"
import TheHeader from "@/app/components/TheHeader"
import { createUser } from "@/db/fetch"
import { NextRequest } from "next/server"
import Statementofhours from '@/app/actions/studying/statementofhour/statementofhours';

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const data = Statementofhours(body.teacher,body.group,body.lesson_id,body.date)
    return new Response(JSON.stringify(data))
}