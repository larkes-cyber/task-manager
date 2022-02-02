import './app-alert-not-compited-goals.css';
import React, {Component} from 'react';
class NotComplitedGoals extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <>
                <div class="b-popup">
                    <div class="b-popup-content">
                        <h1 className='b-popup-title'>Good day! Yesterday you don’t complited some goals:</h1>
                        <div className='listNotComplitedGoals'>
                            <div className='childListNotComplitedGoals'>
                                Пойти в залsa asd asd 
                            </div>
                            <div className='childListNotComplitedGoals'>
                                Пойти в зал
                            </div>
                            <div className='childListNotComplitedGoals'>
                                Пойти в зал
                            </div>
                        </div>
                        <div className='group-checkbox'>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='alertMainBlockGoalsText'>Не удобное время</p>
                                </div>
                                <div className='alertMainBlockGoals '>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='alertMainBlockGoalsText'>непредвиденные обстоятельства</p>
                                </div>
                                <div className='alertMainBlockGoals '>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='alertMainBlockGoalsText'>лень</p>
                                </div>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='alertMainBlockGoalsText'>Нашёл альтернативную замену</p>
                                </div>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='alertMainBlockGoalsText'>Другое</p>
                                </div>
                        </div>
                        <button className='ButSubmitAlert'>Okey</button>
                    </div>
                </div>
            </>
        )
    }
}
export default NotComplitedGoals;