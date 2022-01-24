import React from "react";
import {useSelector} from "react-redux"
import RequstedTask from "./RequstedTask"
import "../../css/Checks.css"
const RequstedTaskList=(props)=>
{
    const tasks = useSelector(state => state.categories.reqtasks).map(tasks=><RequstedTask key={tasks.id} reqTask={tasks}/>)

    return(
       <div className="categories_list">
           {tasks}
       </div>
       
    )
}
export default RequstedTaskList;   