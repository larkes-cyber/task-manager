import './app-header.css';
import React, {Component } from 'react'
const Header=(props)=>{
    return(
        <div className="AppHeader">
            {props.name}
        </div>
    )
}

   

export default Header;