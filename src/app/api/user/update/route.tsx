import { deleteuser } from "@/app/actions/admin/users/deleteuser"
import { updateuser } from "@/app/actions/admin/users/updateuser"
import Admin from "@/app/admin/page"
import TheHeader from "@/app/components/TheHeader"
import { createUser } from "@/db/fetch"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const permission = await updateuser(body.login,body.loginnew, body.full_namenew,body.passwordnew)
    return new Response()
}