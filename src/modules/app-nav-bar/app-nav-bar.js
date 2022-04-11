import './app-nav-bar.css';
import React, {Component } from 'react';
import Stats from '../app-goal-value/img/stats.png';
import Today from '../app-goal-value/img/today.png';
import Goal from '../app-goal-value/img/goal.png';
import Days from '../app-goal-value/img/days.png';
import Star from '../app-goal-value/img/star.png';
import Dash from '../app-goal-value/img/dash.png';
class NavBar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="grp-buttons">
                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='statistics'
                >
                <img src={Stats} alt="" className='iconNav' 
                     onClick={this.props.checkAttue} 
                     data-page='statistics'
                />
                <p className='butTextNav'
                    onClick={this.props.checkAttue} 
                    data-page='statistics'
                >statistics</p>   
                </div>

                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='usually'
                >
                <img src={Star} alt="" className='iconNav' 
                    data-page='usually'
                    onClick={this.props.checkAttue} 
                />
                <p className='butTextNav'
                    data-page='usually'
                    onClick={this.props.checkAttue} 
                >usually</p>   
                </div>

                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='mainGoals'
                >
                <img src={Dash} alt="" className='iconNav' 
                    data-page='mainGoals'
                    onClick={this.props.checkAttue} 
                />
                <p className='butTextNav'
                    data-page='mainGoals'
                    onClick={this.props.checkAttue} 
                >main goals</p>   
                </div>
                
                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='today'
                >
                <img src={Today} alt="" className='iconNav' 
                    data-page='today'
                    onClick={this.props.checkAttue} 
                />
                <p className='butTextNav'
                    data-page='today'
                    onClick={this.props.checkAttue} 
                >today</p>   
                </div>
                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='nextDay'
                >
                <img src={Goal} alt="" className='iconNav'
                     onClick={this.props.checkAttue} 
                     data-page='nextDay'
                />
                <p className='butTextNav'
                     onClick={this.props.checkAttue} 
                     data-page='nextDay'
                >next day</p>
                </div>
                <div className="btn" 
                onClick={this.props.checkAttue} 
                data-page='myDays'
                >
                <img src={Days} alt="" className='iconNav'
                     onClick={this.props.checkAttue} 
                     data-page='myDays'
                />
                <p className='butTextNav'
                     onClick={this.props.checkAttue} 
                     data-page='myDays'
                >my days</p>
                </div>
            </div>
        )
    }
}
export default NavBar;