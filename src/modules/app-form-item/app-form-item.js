import './app-form-item.css';
import React, { Component } from 'react';
import priorBut from '../app-goal-value/img/priorBut.png';
class FormItem extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <form action="" className="itemForm">
                <img src={priorBut} alt="" className="ping"/>
                <input type="text" className="date"/>
                <input type="text" className="goal"/>
            </form>
        )
    }
}
export default FormItem;