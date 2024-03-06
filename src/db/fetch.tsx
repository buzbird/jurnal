import { group } from "console"
import prisma from "./db"
import { Noto_Sans_Tamil_Supplement } from "next/font/google"



export async function GetUserbyGroup(groups: any) {
  //перебор групп и получение по группе студентов
}
export async function getKuratorinGroup(id: any) {
  const kurator = await prisma.group.findMany({
    where:{
      kurator_id: id,
    },
  })
  return kurator
}
//группы
export async function getGroups() {
  const users = await prisma.group.findMany({
    select:{
      id:true,
      group_name:true,
      students:{
        select:{
          user:{
            select:{

              id:true,
              full_name:true,
              login:true,
              passwordHash:true
            }
          }
        }
      }
    }
    // include:{
    //   specialization: true,
    //   kurator: {
    //     include:{
    //       user:true
    //     }
    //   }
    // }
    
  })
  return users
}
export async function getGroup(group_name:any) {
  const users = await prisma.group.findFirst({
    where:{
      group_name: group_name
    }
  })
  return users
}
export async function createGroup(group_name:string, specialization_id:any,kurator_id:any,kurs:any,is_y:any) {
  await prisma.group.create({
    data:{
      group_name :group_name,
      specialization_id : Number(specialization_id),
      kurator_id: Number(kurator_id),
      kurs: Number(kurs),
      is_y: is_y,
    }
  })
}
//удаление пользователя
export async function deleteGroup(id:any) {
const users = await prisma.group.delete({
  where:{
    id:id
  }
})
}
//обновление пользователя
export async function updateGroup(id:any,group_name:any,specialization_id:any,kurator_id:any,kurs:any) {
const updateusers = await prisma.group.update({
  where:{
    id:id
  },
  data:{
    group_name :group_name,
    specialization_id : Number(specialization_id),
    kurator_id: Number(kurator_id),
    kurs: Number(kurs),
  }
})
}


//получение пользователя
export async function getUsers() {
  const users = await prisma.user.findMany({
    include:{
      permission: {
        include:{
          permission: true,
        }
      }
    }
  })
  console.log(users)
  return users
}
export async function getUser(email:any) {
  const user = await prisma.user.findUnique({
    where: {email:email},
  })
  return user
}
//создание пользователя
export async function createUser(email:string,full_name:string,password:string) {
    await prisma.user.create({
      data: {
        full_name: full_name,
        login: email,
        email: email,
        passwordHash: password,
      }
    })

  }
//удаление пользователя
export async function deleteUser(login:any) {
  const users = await prisma.user.delete({
    where:{
      login: login
    }
  })
  console.log(users)
  return users
}
//обновление пользователя
export async function updateUser(login:any,newlogin:any,full_name:any,password:any) {
  const updateusers = await prisma.user.update({
    where:{
      login: login
    },
    data:{
      login: newlogin,
      full_name: full_name,
      passwordHash: password,
    }
  })
  return updateusers
}
// работа со специальностями
export async function getSpecializations() {
  let specializations = await prisma.specializations.findMany({
    select:{
      specializations_id: true,
      specializations_name: true
    }
  })
  return specializations
}
export async function getSpecialization(id: string) {
  let specializations = await prisma.specializations.findFirst({
    where:{
      specializations_id: id
    }
  })
  return specializations
}
export async function UpdateSpecialization(id:any,specializations_id:string,name:string) {
  await prisma.specializations.update({
    where:{
      id:id
    },
    data: {
      specializations_id:specializations_id,
      specializations_name:name
    }
  })
}
export async function DeleteSpecialization(id:any) {
  await prisma.specializations.delete({
    where: {
      id: id,
    }
  })
}
export async function createSpecialization(id:string,name:string) {
  await prisma.specializations.create({
    data: {
      specializations_id:id,
      specializations_name:name
    }
  })
}



//получение текстовой информации о правах
export async function getPermission(email:string) {
  console.log(email)
  let permission = await prisma.user.findFirstOrThrow({
    where: {email:email},
  })
  
  return permission
}


//Преподаватель
export async function getTeacher(id:any){
  const teacher = await prisma.teachers.findFirst({
    where:{
      user_id: id
    }
  })
  return teacher
}

export async function getKurator(id:any){
  const teacher = await prisma.kurator.findFirst({
    where:{
      user_id: id
    }
  })
  return teacher
}
export async function getStudent(id:any){
  const teacher = await prisma.student.findFirst({
    where:{
     id:id
    },
    include:{
      group:true,
    }
  })
  return teacher
}
export async function getdateOfLessonsforStudent(lesson_id:any,lte:any,gte:any,student_id:any){
  const teacher = await prisma.dateOfLessons.findMany({
    where:{
      lesson_id: lesson_id,
      date:{
        lte:lte,
        gte:gte,
      },
    },
    orderBy:{
      date:'asc'
    }
    
  })
  return teacher
}
export async function getassesmentforStudent(lesson_id:any,lte:any,gte:any,student_id:any){
  const teacher = await prisma.assessmentOfLessons.findMany({
    where:{
      student_id: student_id,
      lesson:{
        lesson_id: lesson_id,
        date:{
          lte:lte,
          gte:gte,
        },
      }
    },
    include:{
      lesson:true
    },
    orderBy:{
      lesson:{
        date: 'asc',
      }
    }
  })
  return teacher
}
export async function getStudentlessons(id:any){
  const teacher = await prisma.lessonteached.findMany({
    where:{
     group_id:id,
    },
    select:{
      id:true,
      specialization:{
        select:{
          lesson_name:true,
        }
      },
    }
  })
  return teacher
}

export async function Teacher(id:any) {
  const teacher = await prisma.teachers.findFirst({
    where:{
      teacher_id: id
    },
    include:{
      lessonteached:{
        include:{
          specialization:true
        },
      },
    }
  })
  
  const lesson = await prisma.lessonteached.findMany({
    where:{
      teacher_id: teacher?.teacher_id,
    }, 
    orderBy: {
      lesson_id: 'desc',
    },
    distinct:["lesson_id"],
    include:{
      specialization:true
    }
    
  }
  )
  if(teacher?.lessonteached != undefined){
    teacher.lessonteached = lesson
  }
  return teacher
}


export async function TeachersGroupList(teacher_id:any,lesson_id:any) {
  const lesson = await prisma.lessonteached.findMany({
    where:{
      teacher_id: teacher_id,
      lesson_id: lesson_id,
    },
    select:{
      group:true,
      teacher_id: true,
    },
  }
  )
  return lesson
}


export async function getAssessmentGroup(teacher_id:any,lesson_id:any,group_id:any) {
  const data = await prisma.lessonteached.findFirst({
    where:{
      teacher_id: teacher_id,
      lesson_id: lesson_id,
      group_id: group_id,
    },
    include:{
      group:{
        include:{
          students :{
            select:{
              id:true,
              user: {
                select:{
                  full_name: true
                }
              },
              assessmentofLessons:{
                include:{
                  lesson:{
                    select:{
                      id:true,
                      date:true,
                    }
                  }
                }
              }
              
            },

            orderBy:{
              user:{
                full_name:'asc'
              }
            }
          },
        },
      }
    }
  }
  )
  return data
}
export async function changepassword(id:any,password: any) {
  const lesson = await prisma.user.update({
    where:{
      id:id
    },
    data:{
      passwordHash: password
    }
 
  }
  )
  return lesson
}
export async function gatelessondatefor(lesson_id:any,lte: any,gte:any) {
  const lesson = await prisma.dateOfLessons.findMany({
    where:{
      lesson_id: lesson_id,
      date:{
        lte:lte,
        gte:gte,
      }
    }, 
    orderBy:{
      date: 'asc'
    }
 
  }
  )
  return lesson
}
export async function gatelessonpergroup(lesson_id:any,lte: any,gte:any) {
  const lesson = await prisma.dateOfLessons.findMany({
    where:{
      lesson_id: lesson_id,
      date:{
        lte:lte,
        gte:gte,
      }
    }, 
    orderBy:{
      date: 'asc'
    }
 
  }
  )
  return lesson
}
export async function deleteAssesment(id:any) {
  const lesson = await prisma.assessmentOfLessons.delete({
    where:{
      id: id
    }
  }
  )
  return lesson
}

export async function CreateAssesment(number:any,student_id:any,lesson_id:any) {
  const lesson = await prisma.assessmentOfLessons.create({
    data:{
      number: number,
      student_id: student_id,
      lesson_id: lesson_id,
    }
  }
  )
  return lesson
}

export async function getGroupfromKurator(id:any,group_id:any) {
  const data = await prisma.group.findFirst({
    where:{
      kurator_id: id,
      id: group_id
    },
    select:{
      students:{
        select:{
          id:true,
          user:{
            select:{
              full_name:true
            }
          }
        }
      }
    }
  }
  )
  return data
}
export async function getLessonFromGroup(group_id:any) {
  const data = await prisma.lessonteached.findMany({
    where:{
      group_id: group_id,
    },
    select:{
      id:true,
      specialization: {
        select:{
          lesson_name: true,
        }
      }
    }
  }
  )
  return data
}

export async function getCab() {
  const data = await prisma.cabinetnumber.findMany({
    select:{
      id:true,
      number:true
    }
  }
  )
  return data
}

export async function CreateDateOfLesson(lesson_id:any,lesson_number:any,date:any,cabinet_number:any,) {
  const data = await prisma.dateOfLessons.create({
    data:{
      lesson_id:lesson_id,
      lesson_number:Number(lesson_number),
      date:new Date(date),
      cabinet_number:cabinet_number,
      
    }
  }
  )
  return data
}
export async function getLessonFromDate(date:any,group_id:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
      specialization:{
        group_id: group_id,
      }
    },
    select:{
      cabinet:{
        select:{
          number:true
        }
      },
      specialization:{
        include:{
          teacher:{
            include:{
              user:{
                select:{
                  full_name: true,
                }
              }
            }
          },
          specialization:{
            select:{
              lesson_name:true,
            }
          }
        },
      },
      lesson_number: true,
      cabinet_number: true,
    },
    orderBy:{
      lesson_number: 'asc'
    }
  }
  )
  return data
}


export async function getCab2(date:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
    },
    select:{
      cabinet:{
        select:{
          number:true
        }
      },
      specialization:{
        include:{
          specialization:{
            select:{
              lesson_name:true
            }
          },
          group:{
            select:{group_name:true}
          }
        }
      },
      lesson_number: true,
      cabinet_number: true,
    },
    
    orderBy:[
      {cabinet_number: 'asc'},{lesson_number:'asc'}
    ]
  }
  )
  return data
}
export async function getGroup2(date:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
    },
    select:{
      cabinet:{
        select:{
          number:true
        }
      },
      specialization:{
        include:{
          specialization:{
            select:{
              lesson_name:true
            }
          },
          group:{
            select:{group_name:true}
          }
        }
      },
      lesson_number: true,
      cabinet_number: true,
    },
    
    orderBy:[
      {specialization:{group:{group_name:'asc'}}},{lesson_number:'asc'},
    ]
  }
  )
  return data
}
export async function getTeacher2(date:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
    },
    select:{
      specialization:{
        include:{
          teacher:{
            select: {
              user:{
                select:{
                  full_name:true
                }
              }
            }
          },
          specialization:{
            select:{
              id:true,
              lesson_name:true
            }
          },
          group:{
            select:{group_name:true}
          }
        }
      },
      lesson_number: true,
      cabinet_number: true,
    },
    
    orderBy:[
      {specialization:{teacher:{user:{full_name:'asc'}}}},
      {lesson_number:'asc'}
    ]
  }
  )
  return data
}
export async function getAllLessons() {
  const data = await prisma.lesson.findMany({
    select:{
      id:true,
      lesson_name:true,
    },
    
  }
  )
  return data
}
export async function getAllTeachers() {
  const data = await prisma.teachers.findMany({
    select:{
      teacher_id: true,
      user:{
        select:{
          full_name: true
        }
      },
    },
    
  }
  )
  return data
}
export async function getLessons(date:any,group_id:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
      specialization:{
        group_id: group_id,
      }
    },
    include:{
      specialization:{
        select:{
          specialization:{
            select:{
              lesson_name:true
            },
            
          },
          teacher:{
            select:{
              user:{
                select:{
                  full_name:true
                }
              }
            }
          }
        }
      },
      cabinet:true
    }
 
  }
  )
  return data
}

export async function getLessonId(group_id:any,lesson_name:any) {
  const data = await prisma.lessonteached.findFirst({
    where:{
      group_id: group_id,
      specialization:{
        lesson_name: lesson_name
      }
    }
 
  }
  )
  return data
}
export async function UpdateLessonsSchedule(id:any, lesson_number:any, lesson:any, cab:any) {
  const data = await prisma.dateOfLessons.update({
    where:{
     id:Number(id) 
    },
    data:{
      lesson_number: Number(lesson_number),
      lesson_id: Number(lesson),
      cabinet_number:Number(cab)
    }
  }
  )
}
export async function DeleteLessonsSchedule(id:any) {
  const data = await prisma.dateOfLessons.delete({
    where:{
     id:Number(id) 
    }
  }
  )
}
export async function GetAllStatemnt(teacher_id:any,group_id:any,lesson_id:any) {
  const data = await prisma.lessonteached.findMany({
    where:{
     teacher_id: teacher_id,
     group_id :group_id,
     lesson_id:lesson_id,
    },
    include:{
      dateoflessons:{
        select:{
          date:true,
        },
      },
      group: true,
      specialization:true,
      teacher:{
        include:{
          user:true
        }
      }
    },
    orderBy:[
      {  group:{
          group_name: 'asc'
        }},
        {specialization:{
          lesson_name: 'asc'
        }},{
          teacher:{
            user:{
              full_name: 'asc'
            }
          }
        }
      ]
    }
    )
    return data
 }
export async function GetAllStatemnt2(teacher_id:any) {
  const lesson = await prisma.lessonteached.findMany({
    where:{
      teacher_id: teacher_id,
    }, 
    orderBy: {
      lesson_id: 'asc',
    },
    distinct:["lesson_id"],
    include:{
      specialization:true,
    }
    
  })
  return lesson
}
export async function CreateManydateOflessons(lesson:any){
  const data = await prisma.user.createMany({
    data:[lesson]
  })
  return data
}
export async function gatelessondateforteacher(date:any,teacher_id:any) {
  const data = await prisma.dateOfLessons.findMany({
    where:{
      date:new Date(date),
      specialization:{
        teacher_id:teacher_id
      }
    },
    include:{
      specialization:{
        include:{
          group: true,
          specialization:{
            select:{
              lesson_name:true
            }
          }
        }
      },
      cabinet:{
        select:{
          number:true
        }
      }
    },
    orderBy:{
      lesson_number:'asc',
    }
  }
  )
  return data
}
export async function GetPermission(email:any){
  const data = await prisma.user.findMany({
    where:{
      email:email,
    },
    include:{
      permission:{
        include:{
          permission:true
        }
      }
    }
  })
  return data
}
