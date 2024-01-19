"use client"
import { updategroup } from "@/app/actions/admin/group/list/update";
import { deletespez } from "@/app/actions/admin/group/specializations/delete";
import { updatespez } from "@/app/actions/admin/group/specializations/update";
import { deleteGroup } from "@/db/fetch";
import React, { useState } from "react";

const Update = ({id,group_name,kurs,kurator_id,specializations_name}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [name,setgroup_name] = useState(group_name)
  const [spec_id,setspecialization_id] = useState(specializations_name)
  const [kur_id,setkurator_id] = useState(kurator_id)
  const [kurs_number,setkurs] = useState(kurs)
  const deleteusers = async() =>{
    try {
       setShowModal(false);
       await deleteGroup(id)
    }catch(err){
        console.log(err)
    }
  }
  
  const handleSubmit = async() =>{
    try {
       setShowModal(false);
      await updategroup(id,name,spec_id,kur_id,kurs_number)
    }catch(err){
        console.log(err)
    }
  }
  
  return (
    <div>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}></button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Cпециальность </h3>
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
                    <input type='text' value={name} onChange={(e)=> setgroup_name(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Cпециальность
                    </label>
                    <input type='text' value={spec_id} onChange={(e)=> setspecialization_id(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Куратор
                    </label>
                    <input type='text' value={kur_id} onChange={(e)=> setkurator_id(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Курс
                    </label>
                    <input type='text' value={kurs_number} onChange={(e)=> setkurs(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <div>
                    <button
                    className="text-red-500 border  border-red-200 rounded  background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={deleteusers}
                  >
                    удалить
                  </button>
                    </div>
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
                    обновить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Update;