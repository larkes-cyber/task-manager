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

  const getDaysOfDate=(date)=>{
      let result=0;
      result+=+(date[0]+date[1]);
      result+=+(date[3]+date[4])*30;
      return result;
  }

  let date=getNowDay();
  if(!localStorage.getItem('date')){
    localStorage.setItem('date',getNowDay());
    localStorage.setItem('lastDays','0');
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
      
      if(date===lastDate)return false
      
      const lastDays=getDaysOfDate(date)-getDaysOfDate(localStorage.getItem('date'))-1;

      if (lastDays!=0){

        localStorage.setItem("lastDays",(+localStorage.getItem('lastDays')+lastDays)+'');
        
        localStorage.setItem('date',date);

        return
      }


      console.log(JSON.parse(localStorage.getItem('data')))
      let Data=JSON.parse(localStorage.getItem('data'))
      .filter(item=>item.date===lastDate);
      if(Data.length===0)return false
      Data=Data[0].goals.filter(item=>!item.status);
      arrayOfNotComplitedGoals=Data;
      if(Data.length===0){
        localStorage.setItem('date',date);
      }
      console.log(Data.length!==0)
      return Data.length!==0;
  }
  const submitNoComplitedGoalsForm=()=>{
    setstate(false);
   
  }
  if ((data.length==0)){
      return(
        <>
       {props.flag?null:checkNoComplitedGoals()&&state?<NotComplitedGoals arrayOfNotComplitedGoals={arrayOfNotComplitedGoals} 
      submitNoComplitedGoalsForm={()=>submitNoComplitedGoalsForm()}/>:null}
        <AddPage checkPage={props.checkPage} 
              uploadDataState={props.uploadDataState}
              onComplite={props.onComplite}
              day={date}
              onVisibleHead={()=>props.onVisibleHead()}
              flagMain={props.flagMain}
        />
        </>
   
    )
  }   
  else{
    return (
      <div className="App">
      {props.flag?null:checkNoComplitedGoals()&&state?<NotComplitedGoals arrayOfNotComplitedGoals={arrayOfNotComplitedGoals} 
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