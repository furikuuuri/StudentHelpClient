import axios from "axios";
import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Popup.css"
import { addCategoryReducer, removeCategory, setPopupCategoryUpdateDisplay, setPopupDisplay } from "../../reducers/categoryReducer";
import Input from "../Input";
const PopupCategoryUpdate=()=>
{
    const [categoryName,setCategoryName]= useState("")
    const display=useSelector(state=>state.categories.popupCategoryUpdate);
    const currentCategory = useSelector(state => state.categories.currentCategoryUpdate)
    const currentCategory1 = useSelector(state => state.categories.currentCategory)
    const dispatch=useDispatch();
    useEffect(() => {
        setCategoryName(currentCategory.Name)
        console.log(currentCategory.Name)
    },[currentCategory])
    
    const UpdateCategory=async(categoryId,name)=>
    {
        
            try{
                const response= await axios.post(`https://localhost:5001/api/Category/updateCategory`,
                    {
                        Name:name,
                        Id:categoryId
                    },
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                
                console.log(response.data.id);
                dispatch(removeCategory(categoryId))
                dispatch(addCategoryReducer(response.data))
                setCategoryName("")
                dispatch(setPopupCategoryUpdateDisplay('none'))
                }
            catch(e){
                alert(e);
            } 
    }
   
        
    
    
    return(
        <div className="popup" style={{display:display}} onClick={()=>dispatch(setPopupCategoryUpdateDisplay('flex'))}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Обновить папку</div>
                    <button className="popup__close" onClick={()=>dispatch(setPopupCategoryUpdateDisplay('none'))}>X</button>
                </div>
                
                <Input type="text" value={categoryName} setValue={setCategoryName}  />
                <button className="popup__create" onClick={() => UpdateCategory(currentCategory, categoryName)}>Изменить</button>
            </div>
        </div>
    )
}
export default PopupCategoryUpdate;