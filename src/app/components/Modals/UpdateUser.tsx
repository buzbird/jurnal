"use client"
import { deleteuser } from "@/app/actions/admin/users/deleteuser";
import { updateuser } from "@/app/actions/admin/users/updateuser";
import React, { useState } from "react";

const UpdateUser = ({login,full_name}:any) => {
  const [showModal, setShowModal] = useState(false);
  const [loginnew,setLogin] = useState(login)
  const [full_namenew,setFullName] = useState(full_name)
  const [passwordnew,setPassword] = useState('111111')
  const deleteusers = async() =>{
    try {
       setShowModal(false);
       await fetch("/api/user",{
        method:'DELETE',
        body: JSON.stringify({login: login}),})
    }catch(err){
        console.log(err)
    }
  }
  
  const handleSubmit = async() =>{
    try {
       setShowModal(false);
      await fetch("/api/user/update",{
        method:'POST',
        body: JSON.stringify({login: login,loginnew:loginnew,full_namenew:full_namenew,passwordnew:passwordnew}),
      })
    }catch(err){
        console.log(err)
    }
  }
  
  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">пользователь</h3>
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
                    <input type='text' placeholder={login} value={loginnew} onChange={(e)=> setLogin(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Фио 
                    </label>
                    <input type='text' value={full_namenew} onChange={(e)=> setFullName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Пароль
                    </label>
                    <input type='password' value={passwordnew} onChange={(e)=> setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
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
    </>
  );
};

export default UpdateUser;