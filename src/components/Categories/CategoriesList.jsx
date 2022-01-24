import React from "react";
import {useSelector} from "react-redux"
import Category from "./Category"
import "../../css/Catalog.css"
const CategoriesList=(props)=>
{
    const categories = useSelector(state => state.categories.category).map(categories=><Category key={categories.id} category={categories}/>)

    return(
       <div className="categories_list">
           <div className="categories__list_header">
               <div className="categories_header">Название</div>
               <div  className="categories_header">Описание</div>
               <div  className="categories_header">Цена</div>
           </div>
           {categories}
       </div>
       
    )
}
export default CategoriesList;   