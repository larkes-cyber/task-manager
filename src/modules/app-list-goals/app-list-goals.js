import React, {Component } from 'react';
import DateGoal from '../app-date-value/app-date-value';
import './app-list-goals.css';
import compl from '../app-goal-value/img/compl.png';
import delite from '../app-goal-value/img/del.png';
import ok from '../app-goal-value/img/ok.png';
import butPrior from '../app-goal-value/img/priorBut.png';
import addIcon from '../app-goal-value/img/add.png';

class ListGoals extends Component{
    constructor(props){
        super(props);
        this.date=this.props.data[0].date;
        this.state={
            count:false
        }
    }
    //{date:'20.01.12',goal:'go to gym', "text compliteElem" status:false,priority:false}"complite"{this.state.data[0].date}
    checkTime=(e)=>{
        let elem='';
       console.log(e.target.parentNode.parentNode);
       if(e.target.parentNode.parentNode.classList.contains('itemForms')){
        this.props.onComplite(null,null,e.target.getAttribute('data-change'));
       }

        e.target.parentNode.parentNode.childNodes.forEach(item => {
            if(item.classList.contains('text')){
                elem=item;
            }
            console.log(item)
            // if(item.parentNode.classList.contains('itemForms')){
            //     elem=item;
            // }
        });
        
        const text=elem.childNodes[0].textContent.substr(0,5);
        console.log(e.target.getAttribute('data-change'));
        this.props.onComplite(text,this.date,e.target.getAttribute('data-change'));
    
     }//.filter(item=>item.classList.contains('text'))[0];
    addGoal=()=>{
        this.setState({
            count:!this.state.count
        })

    }
    sumbitForm=(e)=>{
    let data=[];
      document.querySelector('.listGoal').childNodes.forEach(item=>{
          if(item.classList.contains('itemForms')){
            let date='';
            let goal='';
            item.childNodes.forEach(item=>{
                if(item.classList.contains('Adddate')){
                    date=item.value;
                }
                if(item.classList.contains('Addgoal')){
                    goal=item.value;
                }
            })
            data.push({goal:date+' '+goal , priority: false, status: false});
          }
      })
      const newGoals=this.props.data[0].goals;
      newGoals.push(...data);
      this.setState({
          count:!this.state.count
      })
      console.log(this.props)
      this.props.buttonAdd({date:this.date,goals:newGoals})

   
    }
    delFrom=(e)=>{
        console.log(e.target.parentNode.parentNode);
        e.target.parentNode.parentNode.style.display="none";
        this.setState({
            count:false
        })
    }
    render(){
        const addFroms=[];
        if(this.state.count){
            addFroms.push(
                <form className='itemForms'>
                    <input type="text" className="Adddate"/>
                    <input type="text" className="Addgoal"/>
                    <div className='change'>
                        <img src={delite} className="del" data-change='del' onClick={this.delFrom} alt=""/>
                        <img src={ok} className="ok" data-change='ok' onClick={this.sumbitForm} alt="" />
                    </div>
                </form>
            )//delite ||this.props.nextFlag "ok"
        }
        const goals=this.props.data[0].goals.map(({goal,status,priority,branch})=>{
                return(
                    <div className="elem" branch={branch}>
                    {status?<img className={status?'complite':'hide'} src={compl} alt=""/>: <img src={butPrior} className={priority?'priorBut':'priorBut hide'} alt="" />}
                    <div className={status?'text compliteElem'
                    :priority?'priorityElem text':'text'}>
                      <p className='textBlock'>{goal}</p> 
                    </div>
                    <div className={status?'change hide':'change'}>
                        <img src={delite} className="del" data-change='del' onClick={this.checkTime} alt=""/>
                        <img src={ok} className={this.props.nextFlag?'ok hide':'ok'} data-change='ok' onClick={this.checkTime} alt="" />
                    </div>
                </div>
                )

        })
       
        //list
        return(
            <div className={this.props.flag?'list compliteDay':'list'}>
                <h2 className="dateMyList">{this.date}</h2>
                <div className='listGoal'>
                    {goals}
                    {addFroms}
                </div>
            <div className="addBut" onClick={this.addGoal}>
                <img src={addIcon} className="imgPlus" alt=""/>
                <div className="add">add</div>
            </div>
            </div>
        )
    }
    }

export default ListGoals;