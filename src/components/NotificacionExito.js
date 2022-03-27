import React from "react";

const NotificacionExito = ({mensaje})=>{
    if(mensaje===null){
        return null
    }
    return(
        <div className='exito'>{mensaje}</div>
    )
}
export default NotificacionExito