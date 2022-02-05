import './app-my-day.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import ListGoals from '../app-list-goals/app-list-goals';
import AddPage from '../app-add-page/app-add-page';
import MainGoals from '../main-goals-app/main-goals-app';
import NotComplitedGoals from '../app-alert-not-compited-goals/app-alert-not-compited-goals';
import {useState} from 'react';
 function MyDay(props) {
 
  const onAttue=(e)=>{
    return e.target.getAttribute('data-page');
  }
  let data=[];
  console.log(props.date)
  const getNowDay=()=>{
    let day=''+new Date().getDate();
    let month=''+(new Date().getMonth()+1); 
    if(day.length===1){
      day='0'+day;
    }
    if(month.length===1){
      month='0'+month;
    }
    return `${day}.${month}.22`;
  }

  const date=getNowDay();
  if(!localStorage.getItem('date')){
    localStorage.setItem('date','01.02.22');
  }
  if(!localStorage.getItem('forStatic')){
    localStorage.setItem('forStatic',JSON.stringify({
      '1':0,
      '2':0,
      '3':0,
      '4':0,
      '5':0
    }));

  }
  props.data.forEach(item => {
      if(item.date===((props.flag)?props.date:date)){
          data.push(item)
      }
  });
  const setDay=()=>{
    props.onComplite(0,data[0].date,'rem');
  }
  const [state, setstate] =useState (date!==localStorage.getItem('date'));
  let arrayOfNotComplitedGoals=[];
  function checkNoComplitedGoals(){
      const lastDate=localStorage.getItem('date');
      const Data=JSON.parse(localStorage.getItem('data'))
      .filter(item=>item.date===lastDate)[0].goals
      .filter(item=>!item.status);
      arrayOfNotComplitedGoals=Data;
      if(Data.length===0){
        localStorage.setItem('date',date);
      }
      return Data.length!==0 && date!==lastDate;
  }
  const submitNoComplitedGoalsForm=()=>{
    setstate(false);
    localStorage.setItem('date',date);
  }
  if ((data.length==0)){
      return(
      <AddPage checkPage={props.checkPage} 
      uploadDataState={props.uploadDataState}
      onComplite={props.onComplite}
      day={date}
      onVisibleHead={()=>props.onVisibleHead()}
      flagMain={props.flagMain}
      />
    )
  }   
  else{
    console.log(data)
    return (
      <div className="App">
      {checkNoComplitedGoals()&&state?<NotComplitedGoals arrayOfNotComplitedGoals={arrayOfNotComplitedGoals} 
      submitNoComplitedGoalsForm={()=>submitNoComplitedGoalsForm()}/>:null}
        <div className="appMain">
          <div className='part'>
              <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
              <div className="butAndList">
                <ListGoals data={data} flag={data[0].flag} onComplite={props.onComplite} buttonAdd={(data)=>props.buttonAdd(data)} nextFlag={props.nextFlag}/>
                <button className='butRem' onClick={setDay}>remove</button> 
              </div>
          </div>
          {props.flagMain?<div className='slideMainGoals'><MainGoals fix={true}/></div>:null}
          
        </div>
       
      </div>
    );
  }
    
  }
  export default MyDay;