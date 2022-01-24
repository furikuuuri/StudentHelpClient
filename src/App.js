import React, {Component} from 'react';
import {Redirect, Route, Routes} from 'react-router';
import Layout from './components/Layout.jsx';
import { useSelector } from 'react-redux';
import "./css/App.css"

import Registration from './components/Registration';
import Login from './components/Login';
import Catalog from './components/Catalog.jsx';
import Checks from './components/Checks.jsx';
import MyTasks from './components/MyTasks.jsx';
import Account from './components/Account.jsx';

function App()  {
  
  const isAuth=useSelector(state => state.user.isAuth);
  const curUser=useSelector(state=>state.user.currentUser);
    return (
      <div>
      {!isAuth &&
        <Layout>
            <Route path='/' exact={true} component={Login}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/login' component={Login}/> 
            {<Route render={()=><Redirect to={{pathname:"/"}}/>}/>}
         </Layout>
          }
            {isAuth &&
        <Layout>
            <Route path='/account' component={Account}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/checks' component={Checks}/>
            <Route path='/mytasks' component={MyTasks}/>
            {<Route render={()=><Redirect to={{pathname:"/catalog"}}/>}/>}
         </Layout>
          }
      </div>
    );
}
export default App;
