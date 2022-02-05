import './app-statistic.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import Diagramm from '../app-goal-value/img/diagramma.png';
import React, { Component } from 'react';
import MainGoals from '../main-goals-app/main-goals-app';
import TotalStatic from './statics/totalStatic';
import TotalEffectiveStatic from './statics/totalEffectiveStatic';
import DistractionsStatic from './statics/distractionsStatic';
class Statistic extends Component{
     onAttue=(e)=>{
        return e.target.getAttribute('data-page');
      }
      state={
        statistic:<TotalStatic/>
      }
      onChangeStatic=(e)=>{
        const data=e.target.getAttribute('data-numberOfStatistic');
        e.target.parentNode.childNodes.forEach(item=>{
          item.className='btn-static';
        })
        e.target.className+=' active-button';
        if(data==='1'){
          this.setState(state=>({
            statistic:<TotalStatic/>
          }))
        }
        if(data==='2'){
          this.setState(state=>({
            statistic:<TotalEffectiveStatic/>
          }))
        }
        else if(data==='3'){
          this.setState(state=>({
            statistic:<DistractionsStatic/>
          }))
        }
      }
      render(){
        return(
            <div className='wallForStat'>
                <div className='baseStatic'>
                    <div className='partWithNavAndStat'>
                        <NavBar checkAttue={(e)=>this.props.checkPage(this.onAttue(e))}/>
                        <div>
                            <div className='group-btn-static'>
                                <div className="btn-static" onClick={this.onChangeStatic} data-numberOfStatistic='1'>total</div>
                                <div className="btn-static" onClick={this.onChangeStatic} data-numberOfStatistic='2'>efficiency</div>
                                <div className="btn-static" onClick={this.onChangeStatic} data-numberOfStatistic='3'>distractions</div>
                            </div>
                            <div className='fixSomeStatic'>
                                 {this.state.statistic}
                            </div>  
                        </div>
                    </div>
                    {this.props.flagMain?<div className='staticMainGoals slideMainGoals'><MainGoals/></div>:null}
                </div>
                
    
            </div>
        )
      }

}

export default Statistic;