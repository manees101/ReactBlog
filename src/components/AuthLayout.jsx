import React,{useState,useEffect} from "react";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

const Protected=({
    children,
    authentication=true
})=>{
    
    const [loader,setLoader]=useState(true)
    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)
    useEffect(()=>{
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

       if(authentication && authStatus!==authentication)
       {
        navigate('/login')
       }
       else if(!authentication&& authStatus!==authentication)
       {
         navigate('/')
       }
       setLoader(false)
    },[navigate,authStatus,authentication])

    return loader ? <p>Loading...</p> : <>{children}</>
}

export default Protected;