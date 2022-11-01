import "./ProfilePage.scss";

import { FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress } from "@mui/material"
import { useParams } from 'react-router-dom'
import { useQuery } from "react-query"

import getAccountInfo from "../../ApiCalls/getAccountInfo"

const ProfilePage = () => {
    // Params
    const { username } = useParams()

    // Query handler
    const { isLoading, isError, data: profile } 
        = useQuery('getAllAdvanceByEmployeeNo', getAccountInfo.bind(null, {username: username}))

    if (isLoading) {
        return <div className="profile-container">
            <CircularProgress size={"75px"} />
        </div>
    }
    else if (isError) {
        return <div className="profile-container">
            <span style={{color: 'red'}}>Error loading profile data</span>
        </div>
    }
    else {
        return ( 
            <div className="profile-container">
                <h2>Your profile: </h2>
                <div className="profile-wrapper">
                    <TextField id="outlined-basic" label="Fullname" variant="outlined" className="input-width"
                        value={profile.fullname} disabled/>
                    <FormControl className="input-width">
                        <InputLabel id="gender-select-label">Gender</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-select-label"
                            value={profile.gender}
                            label="Gender"
                            disabled
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label="Age" variant="outlined" type="number" className="input-width"
                        value={profile.age} disabled/>
                </div>
            </div>
        );        
    }
    

}
 
export default ProfilePage;