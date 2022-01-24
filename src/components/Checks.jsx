import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"

import RequstedTaskList from "./RequestedTasks/RequstedTasksList"

import axios from "axios"
import { setReqTasks,setCurrentCategory,setTasks} from "../reducers/categoryReducer"
import "../css/Checks.css"
 
const Checks=(props)=>
{
    const dispatch = useDispatch();
    const reqtasks = useSelector(state => state.categories.reqTask)
    const isAuth=useSelector(state =>state.user.isAuth);
    const curUser=useSelector(state=>state.user.currentUser);
    useEffect(() => {
        getTasks();
    }, [reqtasks])
    const getTasks=async ()=>
    {
            try{
                const response= await axios.get(`https://localhost:5001/api/RequestedTask/getAll`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                dispatch(setReqTasks(response.data))
                }
            catch(e){
                alert(e);
            } 
    }

    return(
       <div className="requestedTask">
            <RequstedTaskList/>  
       </div>
      
    )
    
}
export default Checks;   