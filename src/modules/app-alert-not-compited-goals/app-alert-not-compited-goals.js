import './app-alert-not-compited-goals.css';
import React, {Component} from 'react';
class NotComplitedGoals extends Component{
    constructor(props){
        super(props)
    }
//submitNoComplitedGoalsForm
    submitForm=(e)=>{
        this.props.submitNoComplitedGoalsForm()
        const elem=e.target.parentNode.childNodes[2].childNodes;
        let count=0;
        const dataForStatic=JSON.parse(localStorage.getItem('forStatic'));
        console.log(dataForStatic)
        elem.forEach(item=>{
            const input=item.firstChild;
            if(input.checked){
                count+=+input.getAttribute('data-val');
                dataForStatic[input.getAttribute('data-id')]++;
            }

        })
        const Data=JSON.parse(localStorage.getItem('data'));
        let indexThisData='';
        const thisData=Data.filter((item,i)=>{
            if(item.date===localStorage.getItem('date')){
                indexThisData=i;
            }
            return item.date===localStorage.getItem('date');
        })[0];
        thisData.constOfReson=count;
        // .filter(item=>item.date==localStorage.getItem('date'));
        Data[indexThisData]=thisData;
        localStorage.setItem('forStatic',JSON.stringify(dataForStatic))
    }
    render(){
        const arrayOfNotComplitedGoals=this.props.arrayOfNotComplitedGoals.map((item,i)=>(
            <div className='childListNotComplitedGoals' key={i}>
              {item.goal} 
            </div>
       ))
       console.log(arrayOfNotComplitedGoals)
        return(
            <>
                <div class="b-popup">
                    <div class="b-popup-content">
                        <h1 className='b-popup-title'>Good day! Yesterday you don’t complited some goals:</h1>
                        <div className='listNotComplitedGoals'>
                            {arrayOfNotComplitedGoals}
                        </div>
                        <div className='group-checkbox'>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-val='-1' data-id='1' />
                                    <p className='alertMainBlockGoalsText'>Не удобное время</p>
                                </div>
                                <div className='alertMainBlockGoals '>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-val='0' data-id='2' />
                                    <p className='alertMainBlockGoalsText'>непредвиденные обстоятельства</p>
                                </div>
                                <div className='alertMainBlockGoals '>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-val='-2' data-id='3' />
                                    <p className='alertMainBlockGoalsText'>лень</p>
                                </div>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-val='1' data-id='4' />
                                    <p className='alertMainBlockGoalsText'>Нашёл альтернативную замену</p>
                                </div>
                                <div className='alertMainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-val='0' data-id='5' />
                                    <p className='alertMainBlockGoalsText'>Другое</p>
                                </div>
                        </div>
                        <button className='ButSubmitAlert' onClick={this.submitForm}>Okey</button>
                    </div>
                </div>
            </>
        )
    }
}
export default NotComplitedGoals;