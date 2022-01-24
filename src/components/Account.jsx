import React, { useEffect,useState } from "react";
import {useDispatch, useSelector} from "react-redux"

import RequstedTaskList from "./RequestedTasks/RequstedTasksList"
import Input from "./Input"
import axios from "axios"
import { setReqTasks,setCurrentCategory,setTasks} from "../reducers/categoryReducer"
import "../css/Account.css"
 
const Account=(props)=>
{
    // {           
    //     "Username":login,
    //     "Password":password,
    //     "Id":curUser.Id,
    //     "passwordNew":

    // },
    const [passwordOld,setPasswordOld]=useState("")
    const [password,setPassword]=useState("")
    const dispatch = useDispatch();
    const reqtasks = useSelector(state => state.categories.reqTask)
    const isAuth=useSelector(state =>state.user.isAuth);
    const curUser=useSelector(state=>state.user.currentUser); 
    const changePassowrd=async(oldPass,newPass)=>
    {
        await axios.get(`https://localhost:5001/api/User/changePassword?Password=${oldPass}&Id=${curUser.id}&passwordNew=${newPass}`,
        {              
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        } 
        )
        .then(response=>
        {
            console.log(response)
            alert("Пароль успешно сменился")
            
        })
          .catch(err => {
          alert(err.request.response);
          // window.location.href = "/login";
          }
          )            
    }
    return(
       <div className="acc_container">
            <div className="acc_header">Информация об акаунте</div>
            <div className="acc_info">
                <div>Имя пользователя:</div>
                <div>{curUser.username}</div>
            </div>
            <div className="acc_wrapp">
                <div>Введите старый пароль:</div>
                <Input className="acc_input" value={passwordOld} setValue={setPasswordOld}></Input>
                <div>Введите новый пароль:</div>
                <Input className="acc_input" value={password} setValue={setPassword}></Input>
                    <div className="acc_button">
                        <button onClick={()=>changePassowrd(passwordOld,password)}>Сменить</button> 
                    </div>
            </div>
            
        </div>
      
    )
    
}
export default Account;   