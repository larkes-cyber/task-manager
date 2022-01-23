import './app-flip-nav-bar.css';
import Stats from '../app-goal-value/img/stats.png';
import Todo from '../app-goal-value/img/today.png';
import Goal from '../app-goal-value/img/goal.png';
import Days from '../app-goal-value/img/days.png';
const FlipNavBar=(props)=>{
    return(
        <div className='block-flip'>
             <div className="btn-flip" 
                onClick={props.checkAttue} 
                data-page='statistics'>
                <img src={Stats} className='imgNavFlip' alt="" 
                    onClick={props.checkAttue} 
                    data-page='statistics'
                />
               <p className='textNavFlip'
                    onClick={props.checkAttue} 
                    data-page='statistics'
               >statistics</p> 
             </div>
             <div className="btn-flip" 
                onClick={props.checkAttue} 
                data-page='today'
                >
                <img src={Todo} className='imgNavFlip' alt=""
                     onClick={props.checkAttue} 
                     data-page='today'
                 />
               <p className='textNavFlip'
                     onClick={props.checkAttue} 
                     data-page='today'
               >today</p> 
             </div>
             <div className="btn-flip" 
                onClick={props.checkAttue} 
                data-page='nextDay'
                >
                <img src={Goal} className='imgNavFlip' alt="" 
                     onClick={props.checkAttue} 
                     data-page='nextDay'
                />
               <p className='textNavFlip'
                     onClick={props.checkAttue} 
                     data-page='nextDay'
               >next day</p> 
             </div>
             <div className="btn-flip" 
                onClick={props.checkAttue} 
                data-page='myDays'
                >
                <img src={Days} className='imgNavFlip' alt="" 
                    onClick={props.checkAttue} 
                    data-page='myDays'
                />
               <p className='textNavFlip'
                    onClick={props.checkAttue} 
                    data-page='myDays'
               >my days</p> 
             </div>
                
        </div>
    )
}//today nextDay myDays
export default FlipNavBar;