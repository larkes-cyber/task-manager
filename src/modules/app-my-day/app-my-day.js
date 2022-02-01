import './app-my-day.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import ListGoals from '../app-list-goals/app-list-goals';
import AddPage from '../app-add-page/app-add-page';
import MainGoals from '../main-goals-app/main-goals-app';

 function MyDay(props) {

  const onAttue=(e)=>{
    return e.target.getAttribute('data-page');
  }
  let data=[];
  console.log(props.date)
  let day=''+new Date().getDate();
  let month=''+(new Date().getMonth()+1); 
  if(day.length===1){
    day='0'+day;
  }
  if(month.length===1){
    month='0'+month;
  }
  const date=`${day}.${month}.22`;
  console.log(new Date().getDate(),new Date().getMonth()+1)
  //`${new Date().getDate()}.${new Date().getMonth()+1}.22`
  console.log(date)
  props.data.forEach(item => {
      if(item.date===((props.flag)?props.date:date)){
          data.push(item)
      }
  });
  const setDay=()=>{
    props.onComplite(0,data[0].date,'rem');
  }
 console.log(data)
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
  }////<AddPage checkPage={this.checkPage} uploadDataState={this.uploadDataState}/>   
  else{//butAndList
    console.log(data)
    return (
      <div className="App">
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