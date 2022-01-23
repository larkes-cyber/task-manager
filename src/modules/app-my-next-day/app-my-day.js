import './app-my-day.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import ListGoals from '../app-list-goals/app-list-goals';
import AddPage from '../app-add-page/app-add-page';
 function NextDay(props) {
  const onAttue=(e)=>{
    return e.target.getAttribute('data-page');
  }
  let data=[];
  let day=''+(new Date().getDate()+1);
  let month=''+new Date().getMonth()+1; 
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
  if (data.length==0){
      return(
        <AddPage checkPage={props.checkPage} 
        uploadDataState={props.uploadDataState}
        onComplite={props.onComplite}
        day={date}
        onVisibleHead={()=>props.onVisibleHead()}
        />
        )
  }
  else{
    return (
      <div className="App">
        <div className="appMain">
          <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
          <div className="butAndList">
            <ListGoals data={data}  onComplite={props.onComplite} nextFlag={true} buttonAdd={(data)=>props.buttonAdd(data)}/>
            <button className='butRem' onClick={setDay}>remove</button>
          </div>
        </div>
      </div>
    );
  }
    
  }
  export default NextDay;