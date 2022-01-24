import axios from "axios";
import React from "react";
import "./Task.css"
import {useSelector, useDispatch} from "react-redux"
import { removeReqTask } from "../../reducers/categoryReducer";

const MyTask = ({myTask}) => {

  const dispatch = useDispatch();
  
  

  return (
    <div className="mytask">
      <div className="mytask_name">{myTask.task.name}</div>
      <img src={myTask.task.url} className="mytask_image"></img>
    </div>
  )
}
export default MyTask;