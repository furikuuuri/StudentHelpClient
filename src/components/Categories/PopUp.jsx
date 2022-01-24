import axios from "axios";
import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Popup.css"
import { addCategoryReducer, setPopupDisplay } from "../../reducers/categoryReducer";
import Input from "../Input";
const Popup=()=>
{
    const [categoryName,setCategoryName]= useState("")
    const display=useSelector(state=>state.categories.popupDisplay);
    const currentCategory = useSelector(state => state.categories.currentCategory)
    const dispatch=useDispatch();

    
    const addCategory=async(categoryId,name)=>
    {
        
            try{
                const response= await axios.post(`https://localhost:5001/api/Category/addCategory`,
                    {
                        Name:name,
                        ParentId:categoryId
                    },
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                
                console.log(response.data.id);
                dispatch(addCategoryReducer(response.data))
                setCategoryName("")
                dispatch(setPopupDisplay('none'))
                }
            catch(e){
                alert(e);
            } 
    }
   
        
    
    
    return(
        <div className="popup" style={{display:display}} onClick={()=>dispatch(setPopupDisplay('none'))}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={()=>dispatch(setPopupDisplay('none'))}>X</button>
                </div>
                
                <Input type="text" value={categoryName} setValue={setCategoryName} placeholder="Введите название папки..."  />
                <button className="popup__create" onClick={() => addCategory(currentCategory, categoryName)}>Создать</button>
            </div>
        </div>
    )
}
export default Popup;