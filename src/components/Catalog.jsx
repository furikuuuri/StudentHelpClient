import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import CategoriesList from "./Categories/CategoriesList";
import TaskList from "./Tasks/TaskList";
import "../css/Catalog.css";
import axios from "axios"
import { setCategories,setCurrentCategory,addCategoryReducer, setPopupDisplay ,setPopupTaskDisplay,setTasks} from "../reducers/categoryReducer"
import Popup from "./Categories/PopUp";
import PopupTask from "./Tasks/Popuptask";
import PopupBuy from "./Tasks/PopupBuy";
import PopupUpdate from "./Tasks/PopupUpdate";
import PopupCategoryUpdate from "./Categories/PopupCategoryUpdate"
 
const Catalog=(props)=>
{
    const dispatch = useDispatch();
    const currentCategory = useSelector(state => state.categories.currentCategory)
    const categoryStack = useSelector(state => state.categories.categoryStack)
    const isAuth=useSelector(state => state.user.isAuth);
    const curUser=useSelector(state=>state.user.currentUser);
    useEffect(() => {
        getCategory(currentCategory)
    }, [currentCategory])
    useEffect(() => {
        getTasks(currentCategory)
    }, [currentCategory])
    const getCategory=async(categoryId)=>
    {
            try{
                const response= await axios.get(`https://localhost:5001/api/Category/getCategory?id=${categoryId}`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                dispatch(setCategories(response.data))
                }
            catch(e){
                alert(e);
            } 
    }
    const getTasks=async(categoryId)=>
    {
            try{
                const response= await axios.get(`https://localhost:5001/api/Task/getTask?id=${categoryId}`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                dispatch(setTasks(response.data))
                }
            catch(e){
                alert(e);
            } 
    }
    
    function showPopupHandler()
    {
        dispatch(setPopupDisplay('flex'));
    }
    function showPopupTaskHandler()
    {
        dispatch(setPopupTaskDisplay('flex'));
    }
    function backClickHandler() {
        const backId = categoryStack.pop()
        if(backId!=undefined)
            dispatch(setCurrentCategory(backId))
    }


    return(
       <div className="categories">
            <div className="categories_btns">
                <button className="categories_back" onClick={()=>backClickHandler()}>Назад</button>
                {isAuth && curUser.role=="admin" && currentCategory!=0 &&
                <button className="categories_create" onClick={()=>showPopupHandler()}>Создать категорию</button>}
                {isAuth && curUser.role=="admin" && currentCategory!=0 &&
                <button className="categories_create" onClick={()=>showPopupTaskHandler()}>Создать задачу</button>
                }
            </div>
            <div className="categories_content">
                <CategoriesList/>
                <TaskList/>
                <Popup/>
                <PopupTask/>
                <PopupBuy/>
                <PopupUpdate/>
                <PopupCategoryUpdate/>
            </div>
            
       </div>
      
    )
    
}
export default Catalog;   