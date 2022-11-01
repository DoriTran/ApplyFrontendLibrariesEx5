import "./LoginPage.scss"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query"
import { useState } from 'react'
import { useForm } from "react-hook-form";

import postCheckLogin from "../../ApiCalls/postCheckLogin"

const LoginPage = () => {
    const { register: account, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate()

    // Submit handler
    const mutateLogin = useMutation(postCheckLogin, {
        onSuccess: (response) => {
            console.log("Success")
            console.log(response);
            if (response.isLoggedIn) {
                navigate("/profile/" + response.username)
            }
        },
        onError: (error) => {
            console.log("Error")
            console.log(error.response.data);
            console.log(error.response.status);
        }
    })

    const submitHandler = data => {
        console.log(watch())
        mutateLogin.mutate(data)
    }

    return ( 
    <div className="login-container">
        <h2 className="big-title">Login to your account</h2>
        <form className="login-container" onSubmit={handleSubmit(submitHandler)}>
            <div className="input-wrapper ">
                { errors.username && <div className="alert">{errors.username?.message}</div> }
                <TextField id="outlined-basic" label="Username" variant="outlined" className="input-width"
                    {...account("username", { required: "Username is required" })}/>                      
            </div>
            <div className="input-wrapper ">
                { errors.password && <div className="alert">{errors.password?.message}</div> }
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" className="input-width"
                    {...account("password", { required: "Password is required"})}/>
            </div>
            <div className="login-button-group">
                <Link to="/signup" style={{textDecoration: "none" }}>
                    <Button variant="outlined" className="account-btn">Sign up</Button>
                </Link>
                <Button variant="contained" className="account-btn" type="submit">Log in</Button>
            </div>
        </form>
    </div> );
}
 
export default LoginPage;