"use client"
import { creategroup} from "@/app/actions/admin/group/list/create";
import React, { useState } from "react";

const Create = () => {
  const [showModal, setShowModal] = useState(false);
  const [group_name,setgroup_name] = useState('')
  const [is_y,setis_y] = useState(false)
  const [test,setest] = useState('')
  const [specialization_id,setspecialization_id] = useState('')
  const [kurator_id,setkurator_id] = useState('')
  const [kurs,setkurs] = useState('')
  const handleSubmit = async() =>{
    try {
       setShowModal(false);
       await creategroup(group_name,specialization_id,kurator_id,kurs,is_y)
    }catch(err){
        console.log(err)
    }
  }
  
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ml-5"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Добавить
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Новая специальность</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label  className="block text-black text-sm font-bold mb-1">
                      Наименование группы
                    </label>
                    <input type='text' value={group_name} onChange={(e)=> setgroup_name(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      у?
                      <input type="checkbox" onChange={(e)=> setis_y(Boolean(e.target.value))}/>
                    </label>
                    <label  className="block text-black text-sm font-bold mb-1">
                      Cпециальность
                    </label>
                    <input type='number' value={specialization_id} onChange={(e)=> setspecialization_id(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Куратор
                    </label>
                    <input type='number' value={kurator_id} onChange={(e)=> setkurator_id(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Курс
                    </label>
                    <input type='number' value={kurs} onChange={(e)=> setkurs(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    закрыть
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleSubmit}
                  >
                    подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Create;