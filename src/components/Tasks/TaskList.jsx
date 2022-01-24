import React from "react";
import {useSelector} from "react-redux"
import Task from "./Task"
import "../../css/Catalog.css"
const TaskList=(props)=>
{
    const tasks = useSelector(state => state.categories.tasks).map(tasks=><Task key={tasks.id} task={tasks}/>)

    return(
       <div className="tasks_list">
           {tasks}
       </div>
       
    )
}
export default TaskList;   