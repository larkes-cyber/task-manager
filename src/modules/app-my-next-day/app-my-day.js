import './app-my-day.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import ListGoals from '../app-list-goals/app-list-goals';
import AddPage from '../app-add-page/app-add-page';
import MainGoals from '../main-goals-app/main-goals-app';

 function NextDay(props) {
  const onAttue=(e)=>{
    return e.target.getAttribute('data-page');
  }

  let data=[];
  let real_date = new Date().getDate() //new Date().getDate()+1 new Date().getMonth()+1
  let real_month = new Date().getMonth() + 1
  let is_true_30_date = real_month === 4 || real_month === 6 || real_month === 9 || real_month === 11;
  let day = ''+(real_date === 31 || (is_true_30_date && real_date === 30) ? 1 : real_date + 1),
      month = ''+(real_date === 31 || (is_true_30_date && real_date === 30) ? real_month + 1 : real_month );

  if(real_month === 4 || real_month === 6 || real_month === 9 || real_month === 11){
     day=''+(real_date === 31 ? 1 : real_date + 1);
     month=''+(real_date === 31 ? real_month + 1 : real_month ); 
  }  

  if(day.length===1){
    day='0'+day;
  }
  if(month.length===1){
    month='0'+month;
  }

  const date=`${day}.${month}.22`;

  props.data.forEach(item => {
      if(item.date===date){
          data.push(item)
          console.log(item)
      }
  });
  const setDay=()=>{
    props.onComplite(0,data[0].date,'rem');
  }

  if (data.length===0){
  
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
    return (
      <div className="App">
        <div className="appMain">
          <div className='part'>
            <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
            <div className="butAndList">
              <ListGoals data={data}  onComplite={props.onComplite} nextFlag={true} buttonAdd={(data)=>props.buttonAdd(data)}/>
              <button className='butRem' onClick={setDay}>remove</button>
            </div>
          </div>
          {props.flagMain?<div className='slideMainGoals'><MainGoals fix={true}/></div>:null}
          </div>
        
      </div>
    );
  }
    
  }
  export default NextDay;