import "./SignupPage.scss"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom";

import { useState } from 'react'

import postAccountInfo from "../../ApiCalls/postAccountInfo"

const SingupPage = () => {
    const [account, setAccount] = useState({username: '', password: '', fullname: '', gender: '', age: 18})
    const navigate = useNavigate()

    // Submit handler
    const mutateSignup = useMutation(postAccountInfo, {
        onSuccess: (response) => {
            console.log("Success")
            console.log(response);
            navigate("/profile/" + response.username)
        },
        onError: (error) => {
            console.log("Error")
            console.log(error.response.data);
            console.log(error.response.status);
        }
    })

    const submitHandler = event => {
        event.preventDefault()
        mutateSignup.mutate(account)
    }

    return ( 
    <div className="signup-container">
        <h2 className="big-title">Sign up a new account</h2>
        <form className="signup-container" onSubmit={submitHandler}>
            <TextField id="outlined-basic" label="Username" variant="outlined" className="input-width"
                value={account.username}
                onChange={event => setAccount({...account, username: event.target.value})}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" className="input-width"
                value={account.password}
                onChange={event => setAccount({...account, password: event.target.value})}/>
            <TextField id="outlined-basic" label="Fullname" variant="outlined" className="input-width"
                value={account.fullname}
                onChange={event => setAccount({...account, fullname: event.target.value})}/>
            <FormControl className="input-width">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                    labelId="gender-select-label"
                    id="gender-select-label"
                    value={account.gender}
                    label="Gender"
                    onChange={event => setAccount({...account, gender: event.target.value})}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Age" variant="outlined" type="number" className="input-width"
                value={account.age}
                onChange={event => setAccount({...account, age: event.target.value})}/>
            <div className="login-button-group">
                <Link to="/login" style={{textDecoration: "none" }}>
                    <Button variant="outlined" className="account-btn">Log in</Button>
                </Link>
                <Button variant="contained" className="account-btn" type="submit">Sign up</Button>
            </div>            
        </form>


    </div> );
}
 
export default SingupPage;