import React, { useState} from "react";

const Blog = ({ blog,update,user,Delete}) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const hideWhenVisible = {
        display: visible ? '' : 'none',
    }
    const showWhenVIsible = { 
        display: visible ? 'none' : '',
    }
    const handleVisible = () => {
        setVisible(!visible)
    }
    const buttonStyle = {
        background: 'rgb(97, 141, 172, 0.1)',
        borderRadius : '6px',
        marginBottom : 3,
    }
    const likeSuma = ()=>{
        const updateBlog = {
            title : blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user
        }
        update(blog.id,updateBlog)
    }
    const remuveBlog = ()=>{
       if(window.confirm(`Remove blog ${blog.title} `)){
        Delete(blog.id) 
       }
    }
    const StyleBUtonRemove = {
        background: 'blue',
        borderRadius : '6px',
        marginBottom : 3,
    }
    return (
        <div style={blogStyle}>
            <div className="blog" >
                <div style={showWhenVIsible}>
                    {blog.title} <button  style={buttonStyle} onClick={handleVisible} >view</button>
                </div>
                <div style={hideWhenVisible}>
                    {blog.title}<button style={buttonStyle} onClick={handleVisible} >hide</button>
                    <p>{blog.url}</p>
                    <p>likes : {blog.likes} <button style={buttonStyle} onClick={likeSuma} >like</button> </p>
                    <p>{blog.author}</p>
                    <p>
                        {blog.author === user ? <button style={StyleBUtonRemove} onClick={remuveBlog}>Remuve</button> : ''}
                    </p>
                </div>

            </div>
        </div>

    )
}
export default Blog