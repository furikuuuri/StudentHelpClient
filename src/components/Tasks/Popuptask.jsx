import axios from "axios";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import "./PopupTask.css"
import { addTaskReducer, setPopupTaskDisplay } from "../../reducers/categoryReducer";
import Input from "../Input";
const PopupTask=()=>
{
    const [taskName,setTaskName]= useState("")
    const [taskDescription,setTaskDescription]= useState("")
    const [taskPrice,setTaskPrice]= useState("")
    const [taskUrl,setTaskUrl]= useState("")
    const display=useSelector(state=>state.categories.popupTaskDisplay);
    const currentCategory = useSelector(state => state.categories.currentCategory)
    const dispatch=useDispatch();

    
    const addTask=async(categoryId,name,description,price,url)=>
    {
            try{
                const response= await axios.post(`https://localhost:5001/api/Task/addTask`,
                    {
                        Name:name,
                        Description:description,
                        Price:price,
                        Url:url,
                        CategoryTaskId:categoryId,
                    },
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                
                console.log(response);
                dispatch(addTaskReducer(response.data.task))
                setTaskName("")
                setTaskDescription("")
                setTaskPrice("")
                setTaskUrl("")
                dispatch(setPopupTaskDisplay('none'))
                }
            catch(e){
                alert(e);
            } 
    }
   

    
    return(
        <div className="popup" style={{display:display}} onClick={()=>dispatch(setPopupTaskDisplay('none'))}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую задачу</div>
                    <button className="popup__close" onClick={()=>dispatch(setPopupTaskDisplay('none'))}>X</button>
                </div>
                
                <Input type="text" value={taskName} setValue={setTaskName} placeholder="Введите название задачи..."  />
                <Input type="text" value={taskDescription} setValue={setTaskDescription} placeholder="Введите описание задачи..."  />
                <Input type="text" value={taskPrice} setValue={setTaskPrice} placeholder="Введите стоимость задачи..."  />
                <Input type="text" value={taskUrl} setValue={setTaskUrl} placeholder="Ссылка с drop-box"  />
                <button className="popup__create" onClick={() => addTask(currentCategory, taskName,taskDescription,taskPrice,taskUrl)}>Создать</button>
            </div>
        </div>
    )
}
export default PopupTask;