import './app-my-days.css';
import React, {Component } from 'react';
import FlipNavBar from '../app-flip-nav-bar/app-flip-nav-bar';
import DayMyDays from '../app-my-day-item/app-my-days-item';
import ImgOk from '../app-goal-value/img/compl.png';
import plusDay from '../app-goal-value/img/addBut2.png';
import AddDayForm from '../app-add-day-form/app-add-day-form';
import priorBut from '../app-goal-value/img/priorBut.png';
import MainGoals from '../main-goals-app/main-goals-app';
class MyDays extends Component{
    constructor(props){
        super(props);
        this.state={
            addForm:false
        }
    }
    onAttue=(e)=>{
        return e.target.getAttribute('data-page');
    }
    onChangeStateAddForm=(data)=>{
        this.setState({
        addForm:!this.state.addForm
         });
        this.props.uploadDataState(data);
    }
    onChangeStateForm=()=>{
        this.setState({
                 addForm:!this.state.addForm
             });
        this.props.onVisibleHead();
    }
    clickOnBlock=(e)=>{
        console.log(e.currentTarget)
        let data='';
        e.currentTarget.childNodes.forEach(item=>{
            if(item.classList.contains('dateMyDays')){
                data=item.textContent;
            }
        })
        this.props.openPage(data);
    }
    onHideForm=()=>{
        this.setState({
            addForm:false
        })
    }
    render(){
        const days=this.props.data.map(item=>{
            console.log(item)
            return(
                    <div className={item.flag?'blockMyDay compliteDay':'blockMyDay'} onClick={this.clickOnBlock}>
                    <h1 className='dateMyDays'>{item.date}</h1>
                    <div className='ListMyDays'>
                    {//'imgOkMyDays'{item.status?'imgOkMyDays':'hide'} 'list-elem-text' blockMyDay
                            item.goals.map((item,index)=>{
                                if(index+1<=5){
                                    return(
                                     <div className='blockWithTextAndIcon'>
                                     {item.status?<img src={ImgOk} className={item.status?'imgOkMyDays':'hide imgOkMyDays'} alt=""/>
                                     :<img src={priorBut} className={item.priority?'priority':'hide priority'} alt=""/>}
                                        <div className={item.status?'list-elem-text compliteFone'
                                        :item.priority?'list-elem-text priorityFone':'list-elem-text'}>
                                           {item.goal}
                                        </div>
                                      </div>
                                )
                                }  
                            })
                        }
                        </div>
                    <p className='moreMyDays'>more</p>
                </div>
            )

        })
        if(this.state.addForm){
            return(
                <div className='superBlockMyDays'>
                    <div>
                        <AddDayForm changeState={this.onChangeStateAddForm} onHideForm={this.onHideForm} onVisibleHead={()=>this.props.onVisibleHead()}/>
                        {/* <div className={this.state.addForm?'withoutAddDay':''}>
                        <FlipNavBar checkAttue={(e)=>{this.props.checkPage(this.onAttue(e))}}/>
                        <div className='listMyDays'>
                            {days}
                            <div className='fixAddForm'>
                                <h1 className='titleAdd'>Add</h1>
                                <img src={plusDay} className='plusDays' alt="" />
                            </div>
                        </div>  
                       </div> */}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className='superBlockMyDays'>
                    <div>
                        <div className={this.state.addForm?'withoutAddDay':''}>
                        <FlipNavBar checkAttue={(e)=>{this.props.checkPage(this.onAttue(e))}}/>
                        <div className='listMyDays'>
                            {days}
                            <div className='fixAddForm' onClick={this.onChangeStateForm}>
                                <h1 className='titleAdd'>Add</h1>
                                <img src={plusDay} className='plusDays' alt="" />
                            </div>
                        </div>  
                       </div>
                    </div>
                    {this.props.flagMain?<div className='slideMainGoals'><MainGoals fix={true}/></div>:null}
 
                </div>
            )
        }//      {props.flagMain?<div className='slideMainGoals'><MainGoals fix={true}/></div>:null}
 
    }
}
export default MyDays;