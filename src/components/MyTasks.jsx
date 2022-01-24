import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"

import MyTaskList from "./MyTasks/MyTasksList"

import axios from "axios"
import "../css/Checks.css"
import { setMyTasks,setCurrentCategory,setTasks} from "../reducers/categoryReducer"

 
const Checks=(props)=>
{
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.currentUser.id)
    const isAuth=useSelector(state => state.user.isAuth);
    const curUser=useSelector(state=>state.user.currentUser);
    useEffect(() => {
        getTasks();
    },)
    const getTasks=async ()=>
    {
            try{
                const response= await axios.get(`https://localhost:5001/api/Task/getMyTask?id=${userId}`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                dispatch(setMyTasks(response.data))
                }
            catch(e){
                alert(e);
            } 
    }

    return(
       <div className="requestedTask">
            <MyTaskList/>  
       </div>
      
    )
    
}
export default Checks;   