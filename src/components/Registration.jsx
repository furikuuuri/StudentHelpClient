import React,{useState} from "react";
import Input from "./Input"
import "../css/Authorization.css"
import { useDispatch } from "react-redux";
import {setUser} from "../reducers/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";

const Registration =()=>

{ 
    const dispatch = useDispatch()
    const [login,setLogin]=useState("")
        const [email,setEmail]=useState("")
        const [password,setPassword]=useState("")
        const [password2,setPassword2]=useState("")
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };
const registration=async (email1,login1,password1,password21)=>
{
    if(login1.length<3)
    {
        alert('Логин не может быть короче 3 символов');
        return;
    }
    if(password21!==password1)
    {
        alert('Пароли не совпадают');
        window.location.href = "/registration";
        return;
    }
    if(password1.length<6)
    {
        alert('Пароль короткий');
        window.location.href = "/registration";
        return;
        
    }
    if(!validateEmail(email1))
    {
        alert("Некорректный Email-адресс");
        window.location.href = "/registration";
        return;
    }
    await axios.post('https://localhost:5001/api/User/register',
    {
        "Email":email1,   
        "Username":login1,
        "Password":password1  
    })
    .then(response=>
        {
            localStorage.setItem("token",response.data.access_token);
            dispatch(setUser(response.data))
        })
    .catch(err => {
        alert(err.request.response);
        window.location.href = "/registration";}
        )
    
    
    
}
        
        return(
            <div className="authorization">
                <div className="authorization__header">Регистрация</div>
                <Input value={login} setValue={setLogin}  type="text" placeholder="Логин"/>
                <Input value={email} setValue={setEmail} type="text" placeholder="Почта"/>
                <Input value={password} setValue={setPassword}  type="password" placeholder="Пароль"/>
                <Input value={password2} setValue={setPassword2}  type="password" placeholder="Подтверждение пароля"/>
                <button className="authorization__btn" onClick={()=>registration(email,login,password,password2)}><Link to="./catalog">Зарегистрировать</Link></button>   
            </div>)
    
    
                
  
}
export default Registration;
