import axios from "axios"



export default function TodoList({setupdate, style, tasks}) {
  function remove(e){

    let data = Array.from(e.target.parentElement.parentElement.querySelectorAll("td")).map(item=>item.textContent)[0]
    let id = e.target.parentElement.parentElement.id
    let url = String(window.host_addr+"/api/delete/"+data+"/"+id)
    console.log(url)
    axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',}
    })
    setupdate(true)
  }

  function complete(e){

    let data = Array.from(e.target.parentElement.parentElement.querySelectorAll("td")).map(item=>item.textContent)[0]
    let id = e.target.parentElement.parentElement.id
    let url = String(window.host_addr+"/api/mark/"+data+"/"+id)
    console.log(url)
    axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',}
    })
    setupdate(true)
  }



  return (
    <div style={style}>
    <div className="px-4 sm:px-6 lg:px-8" >
   
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    What To Do
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Due Date
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    First Name
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Last Name
                  </th>

                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.what_to_do+task.id} id={task.id} className={task.complete ? "line-through" :""}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {task.what_to_do}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {task.due_date}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {task.first_name}
                    </td>

                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {task.last_name}
                    </td>
  
  
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a onClick={complete} className="text-indigo-600 hover:text-indigo-900">
                        Finished
                      </a>
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a onClick={remove} className="text-indigo-600 hover:text-indigo-900">
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
