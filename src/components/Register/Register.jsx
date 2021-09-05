import React from "react"
import styles from "./Register.module.scss"
import {useForm} from "react-hook-form"
import { useHistory } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apicall from "../../apicalls"

const SignupSchema = yup.object().shape({
    name: yup.string().required("Name is a required Field"),
    email: yup.string().email('Invalid email format').required('Required'),
    password: yup.string().required("Please enter your password"),
    confirmPassword: yup.string().required("Please enter your password again"),

  });

export default function Register(){
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(SignupSchema)
    })
    
    const history = useHistory();
    
    const OnSubmit=async (e)=>{
        if(e["password"]!==e["confirmPassword"]){
            alert("Password and confirm password should be same")
        }
        try{
            let url="https://tranquil-tor-00350.herokuapp.com/users/register";
            let obj={
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(e)
            }
            let response=await apicall({url:url,obj:obj})
            if(response.error){
                if(response.error.code===11000){
                    alert("Email id already exists in our system")
                }
            }
            if(response.data){
                history.push("/login");
                alert("Successfull registered");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    function redirect(){
        history.push('/login')
    }

    return(
            <div className={styles.registerContainer}>
            <h1>Register</h1>
            <form className={styles.register} onSubmit={handleSubmit(OnSubmit)} >
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
                <label htmlFor="password">Password:</label>
                <input type="password" id="password"{...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword"{...register("confirmPassword")} />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                <button>Submit</button>
            </form>
            <p >Already have an account? 
            <button onClick={redirect}>Login</button>
            </p>
        </div>
        
    )
}