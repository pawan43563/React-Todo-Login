import React, { useState ,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Task from "./Task"
import uniqid from "uniqid"
import './Task.css'
import apicall from "../../apicalls"
let url="https://polar-woodland-07461.herokuapp.com/tasks"

export default function Todos(){
    let [todos,setTodo]=useState([])
    let [input,setInput]=useState("")
    const history = useHistory();
    if(!localStorage.getItem('token')){
        history.push('/')
    }
    function setvalue(e){
        setInput(e.target.value)
    }

    useEffect(() => {
        fetchTodos();
    },[]);
    
    const fetchTodos = async () => {
        let obj={
            method:"GET",
            headers:{
                "Accept":"application/json",
                'Content-Type': 'application/json'
            }
        }
        try{
            let response = await apicall({url:url},{obj:obj})
            setTodo(await response.data);
        }catch(error){
            console.log(error);
        }

        
    };
    

    const add=async ()=>{
        let newtask={
            taskId:uniqid(),
            content:input,
            createdAt:new Date().toLocaleString(),
            updatedAt:"",
        }
        try{
            let obj={
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(newtask)
            }
            console.log(obj);
            let response = await apicall({url:url,obj:obj})
            if(response.data){
                let copy=[...todos]
                copy.push(response.data)
                setTodo(copy)
            }
        }catch(error){
            console.log(error);
        }
    }

    const deletetodo=async (e)=>{
        try{
            let obj={
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    'Content-Type': 'application/json'
                }
            }
            let response=await apicall({url:`${url}/${e.target.parentNode.id}`,obj:obj})
            if(response){
                fetchTodos()
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div id="container">
            <h1>Todolist</h1>
            <input type="text" placeholder="Add todo" id="task" value={input} onChange={setvalue}/>
            <button onClick={add}>Add Task</button>
            <div className="tasklist">
            {todos.map((e)=>(
                <Task todo={e} deletetodo={deletetodo}/>
            ))}
            </div>
        </div>
    )
}