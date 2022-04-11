import './app-main-goals.css';
import down from '../app-goal-value/img/down.png';
import NavBar from '../app-nav-bar/app-nav-bar'; 
import starImg from '../app-goal-value/img/images/star.png'

const AppMainGoals = (props) => {

    const onAttue=(e)=>{
        return e.target.getAttribute('data-page');
    }

    return(
        <div className='App'>
            <div className='part'>
               <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
                <div className="app-main-goals">
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                  <div className="some-main-goal">
                    <div className='forPress'>
                        <img src={starImg} className="downImg forImg" alt="" />
                        <p className='main-goal-name'>Что-то важное</p>
                        <img src={down} className="downImg" alt="" />
                    </div>
                  </div>
                </div> 
            </div>
        </div>
       
    )
}

export default AppMainGoals;