import React from "react";
import {useSelector} from "react-redux"
import MyTask from "./MyTask.jsx"
import "../../css/MyTask.css"
const MyTaskList=(props)=>
{
    const tasks = useSelector(state => state.categories.myTasks).map(tasks=><MyTask key={tasks.id} myTask={tasks}/>)

    return(
       <div className="mytask_list">
           {tasks}
       </div>
       
    )
}
export default MyTaskList;   