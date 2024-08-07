import React from "react";
import Article from "../components/Article";
import UsersList from "../components/UsersList";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Users({users, set_new_users}) {

  function addUser(e){

    let inputs = document.querySelectorAll('input')
    let values = [inputs[0].value, inputs[1].value]
    if (values[0] !== "" & values[1] !== ""){
      let data = {first_name:values[0], last_name:values[1]}
      
      axios.post(window.host_addr+"/api/add/user", data)
  
      inputs.forEach(inp=>{inp.value=""})
      set_new_users(true)
      setUpdate(true)
    }
  }
  
  const [update, setUpdate] = useState(false);
  
  useEffect(()=>{
          if (update){
            setUpdate(false)
          }
      }, [update])


  return (
      <>
        {/* Hero section */}
        <Article art={{
                    head:"Users", 
                    body:`See Current Users and Add Users Below`}} 
                 button={{
                    exists:false, 
                    text:"Users", 
                    href:"/"}} 
                style={{ marginTop:"10%", marginBottom:"5%",}}
        />

        <UsersList style={{ paddingLeft:'10%', paddingRight:'10%'}} users={users} set_new_users={set_new_users} />


        {/* form */}
        <div style={{marginTop:'5%'}}>
        <div style={{paddingLeft:'10%', paddingRight:'10%'}}> 
        <div className="space-y-12">
 
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add A User</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                </label>
                <div className="mt-2">
                    <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                </label>
                <div className="mt-2">
                    <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

            </div>
            </div>
            </div>


        <div className="mt-6 flex items-center justify-end gap-x-6">

            <button
            onClick={addUser}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Save
            </button>
        </div>
        </div>
        </div>


      </>
  )
}
