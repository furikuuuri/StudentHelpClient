import axios from "axios";
import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { removeReqTask } from "../../reducers/categoryReducer";
import "../../css/Checks.css"

const RequstedTask = ({reqTask}) => {

  const dispatch = useDispatch();
  const accetTask = async() => {
    try {
      const response = await axios.post(`https://localhost:5001/api/RequestedTask/accept`, {

        TaskId: reqTask.task.id,
        UserId: reqTask.user.id,
        Id: reqTask.id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(removeReqTask(reqTask.id));
    } catch (e) {
      alert(e);
    }
  }
  const declineTask = async() => {
    try {
      const response = await axios.post(`https://localhost:5001/api/RequestedTask/decline`, {

        TaskId: reqTask.task.id,
        UserId: reqTask.user.id,
        Id: reqTask.id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(removeReqTask(reqTask.id));
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="req">
      <div className="req_name">{reqTask.user.username}</div>
      <div className="req_name">{reqTask.task.name}</div>
      <img src={reqTask.url} className="check_img"></img>
      <button onClick={() => accetTask()}>Отправить</button>
      <button onClick={() => declineTask()}>Отменить</button>
    </div>
  )
}
export default RequstedTask;