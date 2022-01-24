import React, {Component} from 'react';
import {useDispatch, useSelector} from "react-redux"

import {Link, NavLink} from 'react-router-dom';
import '../css/NavMenu.css';
// import {logout} from "../reducers/userReducer"
import {logoutCategory} from "../reducers/categoryReducer"


const NavMenuAdmin=(props)=>{
      const isAuth=useSelector(state => state.user.isAuth);
      const curUser=useSelector(state=>state.user.currentUser);
      const categories=useSelector(state=>state.categories.currentUser);
      const dispatch =useDispatch();
      

      return (
        <div className="navbar">
          <div className="container">
            <div className="navbar__header">SHELDY</div>
            {!isAuth &&
              <div className="navbar__login">
                <Link to="./login">Войти</Link>
              </div>
            }
            {
              console.log(curUser)
            }
            {!isAuth &&
              <div className="navbar__registration">
              <Link to="./registration">Регистрация</Link>
              </div>
            }
            {isAuth && curUser.role=="user" &&
              <div className="navbar__registration">
              <Link to="./catalog" >Каталог</Link>
              </div>
            }
            {isAuth && curUser.role=="admin" &&
              <div className="navbar__registration">
              <Link to="./catalog">Редактирование разделов и задач</Link>
              </div>
            }
            {isAuth && curUser.role=="admin" &&
              <div className="navbar__registration">
              <Link to="./checks">Просмотр чеков</Link>
              </div>
            }
            {isAuth && curUser.role=="user" &&
              <div className="navbar__registration">
              <Link to="./mytasks">Мои задачи</Link>
              </div>
            }
            {isAuth  &&
              <div className="navbar__registration">
                <Link to="./account">Аккаунт</Link>
              </div>
            }
            {isAuth &&
              <div className="navbar__registration">
              {curUser.username}/
                <Link to="./" onClick={()=>dispatch(logoutCategory())}>Выход</Link>
              </div>
            }
          </div>

        </div>
      );
  
  }
  export default NavMenuAdmin;

