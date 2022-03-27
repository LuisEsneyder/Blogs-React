import React,{useState} from "react";
const ForAddBlog = ({createBlog})=>{
    const [newTitle, setNewTitle] = useState('')
    const [url, setUrl] = useState('')
    const handleTitleChange = (event)=>{
        setNewTitle(event.target.value)
    }
    const handleUrlChange = (event)=>{
        setUrl(event.target.value)
    }
    const addBlog = (event)=>{
        event.preventDefault()
         createBlog({
            title: newTitle,
            url: url,
          })
          setNewTitle('')
          setUrl('')
    }
    return(
        <form onSubmit={addBlog} >
          <div>
            title : <input type='text' value={newTitle} name='title'
              onChange={handleTitleChange} />
          </div>
          <div>
            url : <input type='text' value={url} name='url'
              onChange={handleUrlChange} />
          </div>
          <button type="submit" >create</button>
        </form>
    )
}
export default ForAddBlog
