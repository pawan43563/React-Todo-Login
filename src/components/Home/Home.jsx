import React from 'react'
import {useHistory} from 'react-router-dom'
import styles from "./Home.module.scss"
export default function Home(){
    const history = useHistory();
    function redirect(){
        history.push('/register')
    }

    return(
        <div className={styles.homeContainer}>
            <h1>Organize your tasks with our simple Todolist application.</h1>
            <button onClick={redirect}>Get Started</button>
        </div>
    )
}