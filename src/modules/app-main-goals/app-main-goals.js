import './app-main-goals.css';
import down from '../app-goal-value/img/down.png';
import NavBar from '../app-nav-bar/app-nav-bar'; 
import starImg from '../app-goal-value/img/images/star.png';
import { useState } from 'react';
import object from '../service/service';


const AppMainGoals = (props) => {

    const images = object;
    const [data, setData] = useState((localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[])

    const onAttue=(e)=>{
        return e.target.getAttribute('data-page');
    }
  
    const MainGoals = data.map(item => (
      <div className="some-main-goal">
          <div className='forPress'>
              <img src={starImg} className="downImg forImg" alt="" />
              <p className='main-goal-name'>{item.goal}</p>
               <img src={down} className="downImg" alt="" />
          </div>
      </div>
    ))

    return(
        <div className='App'>
            <div className='part'>
               <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
                <div className="app-main-goals">
                  {MainGoals}
                </div> 
            </div>
        </div>
       
    )
}

export default AppMainGoals;