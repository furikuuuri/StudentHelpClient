import axios from "axios";
import React, {useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./PopupTask.css"
import {addTaskReducer, removeTaskAdmin, setPopupBuyDisplay, setPopupTaskDisplay,setPopupUpdateDisplay} from "../../reducers/categoryReducer";
import Input from "../Input";
const PopupUpdate = () => {
    const currentTask = useSelector(state => state.categories.currentTask)
  const [taskName,setTaskName] = useState(currentTask.name)
  const [taskDescription,setTaskDescription] = useState(currentTask.description)
  const [taskPrice,setTaskPrice] = useState(currentTask.price)
  const [taskUrl,setTaskUrl] = useState(currentTask.url)
  const display = useSelector(state => state.categories.popupUpdateDisplay);
  useEffect(() => {
    setTaskName(currentTask.name)
    setTaskDescription(currentTask.description)
    setTaskPrice(currentTask.price)
    setTaskUrl(currentTask.url)
},[currentTask])
  
  const dispatch = useDispatch();
  const updateTask=async(id,name,description,price,url)=>
    {
            try{
                const response= await axios.post(`https://localhost:5001/api/Task/updateTask`,
                    {
                        Name:name,
                        Description:description,
                        Price:price,
                        Url:url,
                        Id:id
                    },
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                
                console.log(response);
                dispatch(removeTaskAdmin(response.data.task.id))
                dispatch(addTaskReducer(response.data.task))
                setTaskName("")
                setTaskDescription("")
                setTaskPrice("")
                setTaskUrl("")
                dispatch(setPopupUpdateDisplay('none'))
                }
            catch(e){
                alert(e);
            } 
    }
  return (
    <div
      className="popup" style={{display: display}} onClick={() => dispatch(setPopupUpdateDisplay('none'))}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__header">
          <div className="popup__title">Обновление задачи</div>
          <button className="popup__close" onClick={() => dispatch(setPopupUpdateDisplay('none'))}>X</button>
        </div>
                <Input type="text" value={taskName} setValue={setTaskName}/>
                <Input type="text" value={taskDescription} setValue={setTaskDescription}/>
                <Input type="text" value={taskPrice} setValue={setTaskPrice}/>
                <Input type="text" value={taskUrl} setValue={setTaskUrl}/>
           <button className="popup__create" onClick={() => updateTask(currentTask.id,taskName,taskDescription,taskPrice,taskUrl)}>Изменить</button>
        

        
      </div>
    </div>
  )
}
export default PopupUpdate;