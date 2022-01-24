import React from "react";
import {useSelector,useDispatch} from "react-redux"
import "../../css/Catalog.css"
import TaskLogo from "../../assets/task.png"
import { setPopupBuyDisplay,setCurrentTask,removeTaskAdmin,setPopupUpdateDisplay } from "../../reducers/categoryReducer";
import axios from "axios";


const Task=({task})=>
{
    
    const  dispatch = useDispatch();
    const currentDir = useSelector(state => state.categories.currentCategory)
    const isAuth=useSelector(state => state.user.isAuth);
    const curUser=useSelector(state=>state.user.currentUser);
    function showPopupHandler()
    {
        dispatch(setCurrentTask(task.id))
        dispatch(setPopupBuyDisplay('flex'));
    }
    const removeTask=async()=>
    {
        await axios.get(`https://localhost:5001/api/Task/removeTask?id=${task.id}`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                .then(
                    res=>{

                        dispatch(removeTaskAdmin(task.id))
                    }
                )
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
        
    }
    const changeTask=()=>
    {
        dispatch(setCurrentTask(task))
        dispatch(setPopupUpdateDisplay('flex'));
    }
    return(
        <div className="task_container">
        <img src={TaskLogo} className="task_image"></img>
            <div className="task">
                <div className="task_name">{task.name}</div>
                <div className="task_description">{task.description}</div>
                <div className="task_price">{task.price}</div>  
                {isAuth && curUser.role=="admin" && <div>
                    <img src={task.url} className="task_image_url"></img>
                </div>    }       
            </div>
            {isAuth && curUser.role=="user" &&
                <button className="category_delete" onClick={()=>showPopupHandler()}>Оплатить</button>
             }
            {isAuth && curUser.role=="admin" &&
                <button className="category_delete" onClick={()=>changeTask()}>Изменить</button>
            }
            {isAuth && curUser.role=="admin" &&
                <button className="category_delete" onClick={()=>removeTask()}>Удалить</button>
            }
        </div>
       
    )
}
export default Task;   