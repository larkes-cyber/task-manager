import React, { Component } from 'react';
import './app-goal-value.css';
import compl from './img/compl.png';
import delite from './img/del.png';
import ok from './img/ok.png';
class Goal extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="elem">
                <img className="complite " src={compl} alt=""/>
                <div className="text">
                  <p className='textBlock'>13:00 go to gym</p> 
                </div>
                <div className='change hide'>
                    <img src={delite} className="del" alt=""/>
                    <img src={ok} className="ok" alt="" />
                </div>
            </div>
        )
    }
}
export default Goal;
