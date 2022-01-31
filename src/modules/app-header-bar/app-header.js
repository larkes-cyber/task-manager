import './app-header.css';
import React, {Component } from 'react';
import burger from '../app-goal-value/img/burger.png';
const Header=(props)=>{
    return(
        <div className="AppHeader">
            {props.name}
            <img src={burger} className='burger' alt="" onClick={()=>{props.onOffOrTurnMainComponent()}}/>
        </div>
    )
}

   

export default Header;