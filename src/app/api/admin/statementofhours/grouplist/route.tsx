
import { NextRequest } from "next/server"
import { getgrouplist } from '@/app/actions/jurnal/teacher/getgrouplist';

export async function GET(req: NextRequest) {
    return new Response()
}
export async function POST(req:NextRequest) {
    const body = await req.json()
    const data = await getgrouplist()
    return new Response(JSON.stringify(data))
}