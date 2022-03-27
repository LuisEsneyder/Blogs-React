import React,{useState} from "react";

const Togglable = (props)=>{
    const [visible,setVisible]=useState(false)
    const hideWhenVisible = {display : visible ? '' : 'none'}
    const showWhenVIsible = {display : visible? 'none' : ''}
    const toggleVisible = ()=>{
        setVisible(!visible)
    }
    return(
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisible} >{props.buttonLabel}</button>
            </div>
            <div style={showWhenVIsible} >
            {props.children}
                <button onClick={toggleVisible} >cancel</button>
            </div>
        </div>
    )
}
export default Togglable