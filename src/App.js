import React, { useState, useEffect } from "react";
import Blog from "./components/blogs"
import blogServices from "./services/blogServices";
import loginServices from "./services/loginServices";
import Notificacion from "./components/NotificacionError"
import NotificacionExito from "./components/NotificacionExito"
import index from "./index.css"
import FormLogin from "./components/formLogin";
import ForAddBlog from "./components/formAddBlog";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([])
  const [Users, setUser] = useState(null)
  const [mensajeError,setMensajeError]=useState(null)
  const [mensajeExito,setMensajeExito]=useState(null)
  const cerrarSesion = ()=>{
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  useEffect(async () => {
    try {
      const Blog = await blogServices.getAllBlog()
      setBlogs(Blog.sort((a,b)=>{
        return b.likes -a.likes  
      }))
    } catch (error) {
      setMensajeError('Error obteniendo los datos')
      setTimeout(()=>{
        setMensajeError(null)
      },5000)
      console.log(error)
    }
  }, [])

  const AddnewBlog = async(objetBlog) => {
    try {
      const blog = await blogServices.createBlog(objetBlog)
      setBlogs(blogs.concat(blog))
      setMensajeExito(`${Users.name} added a new blog`)
      setTimeout(()=>{
        setMensajeExito(null)
      },5000)
    } catch (error) {
      setMensajeError('Title and url is required')
      setTimeout(()=>{
        setMensajeError(null)
      },5000)
      console.log(error)
    }
  }
  const updateLink = async(id,blog)=>{
    try {
      const updateBlog = await blogServices.updateLikes(id,blog)
      const blogDesor =blogs.map(eleBlog=> eleBlog.id !== id ? eleBlog : {...eleBlog,likes:updateBlog.likes} ) 
      setBlogs(blogDesor.sort((a,b)=>{
        return b.likes -a.likes  
      }))
    } catch (error) {
      setMensajeError('update fail')
      setTimeout(()=>{
        setMensajeError(null)
      },5000)
      console.log(error)
    }
  }
  const deleteBlog = async(id)=>{
      try {
        const blodDelete = await blogServices.removeBlog(id)
        setBlogs(blogs.filter(eleBlog => eleBlog.id !== id))
      } catch (error) {
        setBlogs(blogs)
        setMensajeError('faild delete')
      setTimeout(()=>{
        setMensajeError(null)
      },5000)
      console.log(error)
      }
  }
  const handleLogin = async (object) => {
    try {
      const user = await loginServices.login(object)
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogServices.setToken(user.token)
      setUser(user)
    } catch (error) {
      setMensajeError('Wrong credentials')
      setTimeout(()=>{
        setMensajeError(null)
      },5000)
    }
  }
useEffect(()=>{
  const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser')
  if(loggedBlogUserJSON){
    const user = JSON.parse(loggedBlogUserJSON)
    setUser(user)
    blogServices.setToken(user.token)
  }
},[])
  
  return (
    <div >
      <Notificacion mensaje={mensajeError}  />
      <NotificacionExito mensaje={mensajeExito} />
      <h1>Blog</h1>
      {Users === null? <Togglable buttonLabel="loging">
        <FormLogin Loging={handleLogin} />
      </Togglable>: <div>
      <Togglable buttonLabel="new blog">
         {Users.name} <button onClick={cerrarSesion}>logout</button>
         <ForAddBlog createBlog={AddnewBlog} />
         </Togglable>
         <ul>
          {blogs.map(blog => <Blog 
          update={updateLink} 
          user={Users.name} 
          blog={blog} 
          key={blog.id}
          Delete={deleteBlog} 
          />)}
        </ul>
      </div>
}
       
        
    </div>
  );
}

export default App;
