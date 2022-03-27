import axios from "axios";

const baseUrl = 'api/login'

const login=async object=>{
    const recuest = await axios.post(baseUrl,object)
    return recuest.data
}
export default {login}