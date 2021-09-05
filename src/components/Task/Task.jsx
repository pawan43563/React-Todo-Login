import React from "react"
import './Task.css'
export default function Task({todo,deletetodo}){
    return(
        <div className="item" key={todo.taskId} id={todo.taskId}>
            <i className="fa fa-circle"></i>
            <p className="inputitem">{todo.content}</p>
            {/* <input type="text" className="inputitem" value={todo.content} /> */}
            <i className="fa fa-edit"></i>
            <p id="time">{todo.createdAt}</p>
            <i className="fa fa-trash" onClick={deletetodo}></i>
        </div>
    )
}