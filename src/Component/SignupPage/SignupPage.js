import "./SignupPage.scss"

import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material/"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import postAccountInfo from "../../ApiCalls/postAccountInfo"

const SingupPage = () => {
    const { register: account, handleSubmit, watch, formState: { errors } } = useForm();
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

    const submitHandler = () => {
        console.log(watch())
        mutateSignup.mutate(account)
    }

    return ( 
    <div className="signup-container">
        <h2 className="big-title">Sign up a new account</h2>
        <form className="signup-container" onSubmit={handleSubmit(submitHandler)}>
            <div className="input-wrapper ">
                { errors.username && <div className="alert">{errors.username?.message}</div> }
                <TextField id="outlined-basic" label="Username" variant="outlined" className="input-width"
                    {...account("username", {
                        required: "Username is required",
                        maxLength: { value: 15, message: "Max length of username is 15"}
                })}/>                      
            </div>
            <div className="input-wrapper ">
                { errors.password && <div className="alert">{errors.password?.message}</div> }
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" className="input-width"
                    {...account("password", { required: "Password is required"})}/>
            </div>
            <div className="input-wrapper ">
                { errors.fullname && <div className="alert">{errors.fullname?.message}</div> }
                <TextField id="outlined-basic" label="Fullname" variant="outlined" className="input-width"
                    {...account("fullname", { required: "Fullname is required"})}/>
            </div>
            <div className="input-wrapper ">
                { errors.gender && <div className="alert">{errors.gender?.message}</div> }
                <FormControl className="input-width">
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        {...account("gender", { required: "Gender is required"})}
                        label="Gender"
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="input-wrapper ">
                { errors.age && <div className="alert">{errors.age?.message}</div> }
                <TextField id="outlined-basic" label="Age" variant="outlined" type="number" className="input-width"
                    {...account("age", {
                        required: "Age is required",
                        max: { value: 99, message: "Max age is 99"},
                        min: { value: 1, message: "Min age is 1"}
                })} />                
            </div>

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