import React, {Component,useState} from "react";
import  {useNavigate}  from 'react-router';
import { useDispatch } from "react-redux";
import Input from "./Input"
import "../css/Authorization.css"


import {setUser} from "../reducers/userReducer";
import {Link, NavLink} from 'react-router-dom';
import axios from "axios";

const Login=()=>
{
  const [login,setLogin]=useState("")
  const [password,setPassword]=useState("")
  const dispatch=useDispatch();
  let path="./catalog"
  const loginUser=async(login,password)=>
  {
    await axios.post('https://localhost:5001/api/User/login',
    {           
      "Username":login,
      "Password":password,
      
    },
    )
    .then(response=>
    {
        console.log(response)
        localStorage.setItem("token",response.data.access_token);
        dispatch(setUser(response.data))
    })
      .catch(err => {
      alert(err.request.response);
      // window.location.href = "/login";
      }
      )            
   }
    return (
      <div className="authorization">
        <div className="authorization__header">Войти</div>
        <Input type="text" value={login} setValue={setLogin} placeholder="Логин"/>
        <Input type="password" value={password} setValue={setPassword} placeholder="Пароль"/>
        <button className="authorization__btn" onClick={()=>loginUser(login, password)}><Link to={path}>Войти</Link></button>
      </div>
    )

  

}
export default Login;