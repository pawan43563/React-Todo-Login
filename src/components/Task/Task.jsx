import React from "react"
import styles from './Task.module.css'
export default function Task({todo,deletetodo}){
    return(
        <div className={styles.item}  id={todo.taskId}>
            <i className="fa fa-circle"></i>
            <p className={styles.inputitem}>{todo.content}</p>
            {/* <input type="text" className="inputitem" value={todo.content} /> */}
            <i className="fa fa-edit"></i>
            <p id="time">{todo.createdAt}</p>
            <i className="fa fa-trash" onClick={deletetodo}></i>
        </div>
    )
}