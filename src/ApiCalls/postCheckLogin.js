import { API_URL } from "./api-url"
import axios from 'axios'

const getCheckLogin = async(body) => {
    console.log(body)
    let res = null
    try {
        res = await axios({
            method: 'post',
            url: API_URL + '/account/login',
            data: body
        })
        return res.data
    } catch (err) {
        throw(alert(new Error(err.response.data.message)))
    }
}

export default getCheckLogin