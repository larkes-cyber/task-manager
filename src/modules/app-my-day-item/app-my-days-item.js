
import React, { Component } from 'react';
import MyDaysDate from './add-my-days-date/add-my-days-date';
import './app-my-days-item.css';
import ListElem from './app-list-elem/app-list-elem';
class DayMyDays extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        return(
            <div className='blockMyDay'>
                <MyDaysDate/>
                <div className='ListMyDays'>
                    <ListElem/>
                    <ListElem/>
                    <ListElem/>
                    <ListElem/>
                    <ListElem/>
                </div>
                <p className='moreMyDays'>more</p>
            </div>
        )
    }
}
export default DayMyDays;
 