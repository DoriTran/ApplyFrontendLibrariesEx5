import { API_URL } from "./api-url"
import axios from 'axios'

const getAccountInfo = async(params) => {
    let res = null
    try {
        res = await axios({
            method: 'get',
            url: API_URL + '/account/profile',
            params: params
        })
        return res.data
    } catch (err) {
        throw(alert(new Error(err.response.data.message)))
    }
}

export default getAccountInfo