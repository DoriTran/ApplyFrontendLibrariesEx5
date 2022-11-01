import "./LoginPage.scss"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query"
import { useState } from 'react'

import postCheckLogin from "../../ApiCalls/postCheckLogin"

const LoginPage = () => {
    const [account, setAccount] = useState({username: '', password: ''})
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

    const submitHandler = event => {
        event.preventDefault()
        mutateLogin.mutate(account)
    }

    return ( 
    <div className="login-container">
        <h2 className="big-title">Login to your account</h2>
        <form className="login-container" onSubmit={submitHandler}>
            <TextField id="outlined-basic" label="Username" variant="outlined" 
                value={account.username} onChange={event => setAccount({username: event.target.value, password: account.password} )}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" 
                value={account.password}  onChange={event => setAccount({username: account.username, password: event.target.value} )}/>
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