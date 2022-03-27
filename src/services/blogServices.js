import axios from "axios"

const baseUrl = '/api/blogs'
let token = null
const setToken = newToken =>{
    token =`bearer ${newToken}`
}
const getAllBlog=async ()=>{
    const recuest = await axios.get(baseUrl)
    return recuest.data
}
const createBlog = async(nuewBlog)=>{
    const config ={
        headers : {authorization : token} 
    }
    const recuest = await axios.post(baseUrl,nuewBlog,config)
    return recuest.data
}
const updateLikes = async (id,blog)=>{
    const recuest= await axios.put(`${baseUrl}/${id}`,blog)
    return recuest.data
}
const removeBlog = async (id)=>{
    const config = {
        headers : {authorization : token}
    }
    const recuest = await axios.delete(`${baseUrl}/${id}`,config)
    return recuest.data
}
export default {getAllBlog,createBlog,setToken,updateLikes,removeBlog}