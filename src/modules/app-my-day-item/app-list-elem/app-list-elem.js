import './app-list-elem.css';
import React, {Component } from 'react';
import ImgOk from '../../app-goal-value/img/compl.png';
class ListElem extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className='blockWithTextAndIcon'>
                <img src={ImgOk} className='imgOkMyDays' alt="" />
                <div className='list-elem-text'>
                   13:00 go to gym 
                </div>
            </div>
        )
    }
}
export default ListElem;
