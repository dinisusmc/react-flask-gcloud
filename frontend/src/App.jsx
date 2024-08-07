import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Header from './components/Header';
import Particle from './components/Particle';
import Page from './components/Page';
import Users from './pages/Users'
import axios from 'axios'
import { useState, useEffect } from "react";
import { host_addr } from './appConfig';

const nav = [
  { name: 'ToDo', href: '/' },
  { name: 'Users', href: '/users' },
]

window.host_addr = host_addr;

export default function App() {

    function getUsers() {

        axios.get(window.host_addr+"/api/users", {
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',}
        }).then(data=>setUsers(data.data))
        }

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);

    useEffect(()=>{
        getUsers()
        if (newUser){
          setNewUser(false)
        }
    }, [newUser])
    

    return(
    <BrowserRouter>

        <Particle />
        <Header navigation={nav}/>
    
        <Routes>
          <Route path="/" element={<Page content={<Home users={users}/>} />} />
          <Route path="/users" element={<Page content={<Users users={users} set_new_users={setNewUser}/>} />} />
        </Routes>
    
    </BrowserRouter>
    )

}





