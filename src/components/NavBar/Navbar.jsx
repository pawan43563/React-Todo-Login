import React from 'react';
import {Link,useHistory} from 'react-router-dom'
import styles from './Navbar.module.scss'
import logo from '../../logo.svg'

export default function Navbar({islogin,islogout}){
    const history = useHistory();


    function logout(){
        islogout()
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className={styles.navigation}>
        <div className={styles.logo}>
            <img src={logo} alt="" />
        </div>
        <nav>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                {
                    islogin ?
                    " "
                    :
                    <Link to="/register">
                    <li>Register</li>
                    </Link>

                }
                {
                    islogin ?
                    <li onClick={logout}>Logout</li>
                    :
                    <Link to="/login">
                    <li>Login</li>
                    </Link>

                }
                
            </ul>
        </nav>
    </div>
    )
}