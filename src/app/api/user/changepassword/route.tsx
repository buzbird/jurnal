import { deleteuser } from "@/app/actions/admin/users/deleteuser"
import { updateuser } from "@/app/actions/admin/users/updateuser"
import { Changepassword } from "@/app/actions/users/changepassword"
import Admin from "@/app/admin/page"
import TheHeader from "@/app/components/TheHeader"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    // const permission = await Changepassword()
    return new Response("k")

}