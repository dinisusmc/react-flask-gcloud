import React from "react";
import Article from "../components/Article";
import TodoList from "../components/ToDoList";
import axios from 'axios';
import { useState, useEffect } from "react";


export default function Home({users}) {

function addTask(e){
  
  let id = document.querySelector('select').value
  let inputs = document.querySelectorAll('input')
  let values = [inputs[0].value, inputs[1].value]
  if (values[0] !== ""){
    let data = {'id':id, whatToDo:values[0], dueDate:values[1]}
    
    axios.post(window.host_addr+"/api/add", data)

    inputs.forEach(inp=>{inp.value=""})
    setUpdate(true)}
}


function getTasks() {

    axios.get(window.host_addr+"/api/items", {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',}})
    .then(data=>setTasks(data.data))
  }

    const [tasks, setTasks] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(()=>{
        getTasks()
        if (update){
          setUpdate(false)
        }
    }, [update])

  return (
      <>
        {/* Hero section */}
        <Article art={{
                    head:"What to do today...", 
                    body:`Manage your tasks below`}} 
                 button={{
                    exists:false, 
                    text:"", 
                    href:"/"}} 
                style={{ marginTop:"10%", }}
        />

        <TodoList setupdate={setUpdate} tasks={tasks} style={{ paddingLeft:"10%", paddingRight:"10%", marginTop:"5%", }}/>

        <div style={{marginTop:'5%'}}>
        <div style={{paddingLeft:'10%', paddingRight:'10%'}}> 
        <div className="space-y-12">
 
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add A User</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 inline">
                
                <div className="sm:col-span-2">
                <label htmlFor="what_to_do" className="block text-sm font-medium leading-6 text-gray-900">
                    What To Do
                </label>
                <div className="mt-2">
                    <input
                    id="what_to_do"
                    name="what_to_do"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2">
                <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Due Date
                </label>
                <div className="mt-2">
                    <input
                    id="due_date"
                    name="due_date"
                    type="date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  User
                </label>
                <div className="mt-2">
                  <select
                    id="user"
                    name="user"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {users.map((user)=>{
                        return(<option key={user.uid} value={user.uid}>{user.first_name} {user.last_name}</option>)
                    })}

                  </select>
                  </div>
                  </div>


            </div>
            </div>
            </div>


        <div className="mt-6 flex items-center justify-end gap-x-6">

            <button
            onClick={addTask}
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
