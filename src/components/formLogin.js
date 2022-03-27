import React,{useState} from "react";

const FormLogin = ({Loging})=>{
    const [nameuser,setNameuser]=useState('')
    const [password,setPasword]=useState('')
    const handleNameUserchange = event=>{
        setNameuser(event.target.value)
    }
    const handlePasswordchange = event =>{
        setPasword(event.target.value)
    }
    const loginOk = (event)=>{
        event.preventDefault()
        Loging({
            username : nameuser,
            passwordHas : password
        })
        setNameuser('')
        setPasword('')
    }
    return(
        <div>
            <form onSubmit={loginOk}>
                <div>
                    username : <input
                    type='text'
                    name="username"
                    value={nameuser}
                    onChange={handleNameUserchange}
                    />
                </div>
                <div>
                    password : <input
                    type='password'
                    name="password"
                    value={password}
                    onChange={handlePasswordchange}
                    />
                </div>
                <button type="submit" >login</button>
            </form>
        </div>
    )

}
export default FormLogin