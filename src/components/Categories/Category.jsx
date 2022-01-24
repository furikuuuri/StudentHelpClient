import React from "react";
import {useSelector,useDispatch} from "react-redux"
import "../../css/Catalog.css"
import CategoryLogo from "../../assets/papka.png"
import { pushToStack, removeCategory, setCurrentCategory,setCurrentUpdateTask,setPopupCategoryUpdateDisplay } from "../../reducers/categoryReducer";
import axios from "axios";


const Category=({category})=>
{
    
    const  dispatch = useDispatch();
    const currentDir = useSelector(state => state.categories.currentCategory)
    const role=useSelector(state=>state.user.currentUser.role);
    function openCategory(){
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentCategory(category.id))
    }
    const deleteCategory=async()=>
    {
        await axios.get(`https://localhost:5001/api/Category/removeCategory?id=${category.id}`,
                    {              
                        headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
                    } 
                )
                .then(
                    res=>{
                        dispatch(removeCategory(category.id))
                    }
                )
                .catch(
                    err=>{
                        console.log(err)
                    }
                )
        
    }
    const updateCategory=async()=>
    {
        dispatch(setPopupCategoryUpdateDisplay('flex'));
        
    }

    return(
        <div className="category_wrap">
            <div className="category" >
                <img src={CategoryLogo} onClick={()=>openCategory()} ></img>
                <div className="category_name" onClick={()=>openCategory()}>{category.name}</div>
            </div>
            {/* { 
                role=="admin"&&<button className="category_delete" onClick={()=>updateCategory()}> Изменить</button>
            } */}
            { 
                category.level!=1&&role=="admin"&&<button className="category_delete" onClick={()=>deleteCategory()}> Удалить</button>
            } 
        </div>
       
    )
}
export default Category;   