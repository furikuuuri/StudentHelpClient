import axios from "axios";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./PopupTask.css"
import {addTaskReducer, setPopupBuyDisplay, setPopupTaskDisplay} from "../../reducers/categoryReducer";
import Input from "../Input";
const PopupBuy = () => {
  const [taskName,setTaskName] = useState("")
  const [taskDescription,setTaskDescription] = useState("")
  const [taskPrice,setTaskPrice] = useState("")
  const [taskUrl,setTaskUrl] = useState("")
  const display = useSelector(state => state.categories.popupBuyDisplay);
  const id = useSelector(state => state.user.currentUser.id);
  const taskId = useSelector(state => state.categories.currentTask);
  const currentCategory = useSelector(state => state.categories.currentCategory)
  const dispatch = useDispatch();
  const [file, setFile] = useState()
  let state={
    file:''
  }
 
  
  // On file select (from the pop up)
  
  const UploadContent = (event) => {
    try{
      
      console.log(event.target.files[0])
      if (event.target.files[0]) {
        
          setFile(event.target.files[0]);
          
       }
      
    }
    catch(e)
    {
      console.log(e)
    }
  }
    
  const OnSumbit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('uploadedFile', file);
    console.log(formData);

    await axios
      .post(`https://localhost:5001/api/RequestedTask/addRequestTask?userId=${id}&taskId=${taskId}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((res) => {
        alert(`Success` + res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };



  return (
    <div
      className="popup" style={{display: display}} onClick={() => dispatch(setPopupBuyDisplay('none'))}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__header">
          <div className="popup__title">Оплата</div>
          <button className="popup__close" onClick={() => dispatch(setPopupBuyDisplay('none'))}>X</button>
        </div>
        
        <form >
          <input id="contained-button-content" name="uploadedFile" accept="image/*,image/jpeg" onChange={UploadContent}  type="file" />
          <button className="popup__create" onClick={OnSumbit}>Отправить</button>
        </form>

        
      </div>
    </div>
  )
}
export default PopupBuy;