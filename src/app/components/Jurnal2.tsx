import { link } from 'fs'
import JurnalForm from '../components/Modals/jurnal/Jurnal'
const getLesson = async() =>{
    try{
      const lesson = await fetch(process.env.API +"/api/jurnal/teacher",{
        method:'POST',
        body: JSON.stringify({teacher_id: 1}),
    })
    if(!lesson.ok){
      throw new Error(`Error! status: ${lesson.status}`);
    }
    const data = await lesson.json()
    return data
    }catch(err){
      console.log(err);
    }
}

export default async function Jurnal2(){
    const data = await getLesson()
    return (
      <JurnalForm lesson={data}/>
    )
};