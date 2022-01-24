import React, { Component } from 'react';


import  NavMenuAdmin  from './NavMenuAdmin';
import "../css/layout.css"

const Layout=(props)=> {
    

  
    return(
      <div className="layout">     
          <NavMenuAdmin/>
          {props.children}
        
      </div>
    );
  
}
export default Layout;