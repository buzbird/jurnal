import { getAssessmentGroup } from "@/db/fetch"

import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return new Response("работает")
}

export async function POST(req:NextRequest) {
    const body = await req.json()
    type Assessmet =  {
        id:number,
        number:string,
        date_id:number,
    }
    type AssessmetDate =  {
        id: Number,
        date: Date ,
        assessments: Assessmet[]
    }

    type Student = {id:number,full_name:string,assessments:AssessmetDate[]}
    type Students = {students: Student[]};
    const assessmentGroup = await getAssessmentGroup(body.teacher_id, body.lesson_id,body.group_id)
    const students:Students = {students: []};
    
    assessmentGroup?.group?.students.map((student:any) => {
        let assessmetDate: AssessmetDate[]= []
        let id = -1;
        let date : string;
        student.assessmentofLessons.map((asessment:any) =>{
            if(date === asessment.lesson.date.toJSON()){
                assessmetDate[id].assessments = [
                    ...assessmetDate[id].assessments 
                    ,{
                        id:asessment.id,
                        number:asessment.number,
                        date_id:asessment.lesson_id,
                    } ]
            }else{
                date = asessment.lesson.date.toJSON()
                assessmetDate= [
                    ...assessmetDate,
                    {
                        id: id+1,
                        date: asessment.lesson.date,
                        assessments :[]
                    }
                ]
                id =id +1;
                assessmetDate[id].assessments = [
                    ...assessmetDate[id].assessments 
                    ,{
                        id:asessment.id,
                        number:asessment.number,
                        date_id:asessment.lesson_id,
                    } ]
            }

        })
        students.students = [
            ...students.students,
            {
                id: student.id,
                full_name: student.user.full_name,
                assessments: assessmetDate
            }
        ]
    })
    return new Response(JSON.stringify(students))
}
