"use client"
import { createuser } from "@/app/actions/admin/users/createuser";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const [login,setLogin] = useState('')
  const [full_name,setFullName] = useState('')

  const handleSubmit = async() =>{
    try {
       setShowModal(false);
       const createuser = await fetch("http://5.35.93.157:2000/api/header",{
        method:'POST',
        body: JSON.stringify({login: login,full_name:full_name,password:"111111"}),
      })
        
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
        новый пользователь
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Новый пользователь</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Логин
                    </label>
                    <input type='text' value={login} onChange={(e)=> setLogin(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Фио 
                    </label>
                    <input type='text' value={full_name} onChange={(e)=> setFullName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
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

export default Modal;