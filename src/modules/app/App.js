
import './App.css';
import MyDay from '../app-my-day/app-my-day';
import AddPage from '../app-add-page/app-add-page';
import MyDays from '../app-my-days/app-my-days';
import Statistic from '../app-statistic/app-statistic';
import Header from '../app-header-bar/app-header';
import React, {Component} from 'react';
import NextDay from '../app-my-next-day/app-my-day';
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      page:'today',
      data:(localStorage.getItem('data')!=null)?JSON.parse(localStorage.getItem('data')):[],
      date:'',
      visibleHead:true

      }
    }//JSON.parse(localStorage.getItem('data'))(localStorage.getItem('data')!=null)?JSON.parse(localStorage.getItem('data')):[]
    onVisibleHead=()=>{
  
      this.setState({
        visibleHead:!this.state.visibleHead
      })
    }
    uploadDataState=(propData)=>{
      let poperty=propData;
      poperty={
        date:poperty[1],
        goals:propData[0]
      }
      let array=[];
      this.state.data.forEach(item=>{
        array.push(item);
      })
    
    array.push(poperty);
    console.log(array);
      this.setState({
        data:array
      })
      console.log(this.state)

      localStorage.setItem('data',JSON.stringify(array));
    }
  checkPage=(attue)=>{
    this.setState({page:attue});
  }
  buttonAdd=(property)=>{
    function getMinets(date){
      let hours=date.substr(0,2);
      let min=date.substr(3,5);
      return ((+hours[1]*60)+(+(hours[0]+'0')*60))+(+(min[0]+'0')+ +(min[1]))
    }
    let arr=property.goals;
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (getMinets(arr[i].goal.substr(0,5)) > getMinets(arr[i+1].goal.substr(0,5))) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    let newArr=this.state.data;
    let index='';
    newArr.forEach((item,i)=>{
      if(item.date===property.date){
        index=i;
      }
    })
    console.log(index)
    newArr=newArr.filter((item,i)=>i!==index);
    newArr.push(property);
    this.setState({
      data:newArr
    });
    localStorage.setItem('data',JSON.stringify(newArr));
        
  }
  onComplite=(time,date,whoBut)=>{
    let copyArr=this.state.data;
      let copyDay='';
      let copyArray=this.state.data;
      let indexDay='',
          indexGoal='';
      copyArray=copyArray.filter((item,i)=>{
        if(item.date==date){
          indexDay=i;
          return item;
        }
      });
      //fg
      if(whoBut=='rem'){
        let retData=this.state.data;
        retData.splice(indexDay,1);
        console.log(retData)
        this.setState({
          data:retData
        })
        localStorage.setItem('data',JSON.stringify(retData));
      }
      copyDay=copyArray;
      console.log(copyArray);
      copyArray=copyArray[0].goals.filter((item,i)=>{
        if(item.goal.substr(0,5)==time){
          indexGoal=i;
          return item;
        }
      });

    if(whoBut=='ok'){
      copyArray[0].status=true;
      copyDay[0].goals[indexGoal]=copyArray[0];
      const allGoals=copyDay[0].goals.length;
      const okArray=copyDay[0].goals.filter(item=>item.status).length;
      if(allGoals===okArray){
        copyDay[0].flag=true;
      }
      copyArr[indexDay]=copyDay[0];
      console.log(copyArr)
      this.setState({
        data:copyArr
      })
      localStorage.setItem('data',JSON.stringify(this.state.data));
      console.log(JSON.parse(localStorage.getItem('data')))
    }
    if(whoBut=='del'){
     copyDay[0].goals.splice(indexGoal,1);
     console.log(copyDay[0].goals.length)
     if(copyDay[0].goals.length===0){
       copyArr.splice(indexDay,1);
     }
     else{
      copyArr[indexDay]=copyDay[0];
     }
      this.setState({
        data:copyArr
      })
      localStorage.setItem('data',JSON.stringify(this.state.data));
    } 
  
  }
  openPage=(data)=>{
    this.setState({
      date:data,
      page:'random'
    })
  }
  onLoadPage=(page)=>{
    if(page==='random'){
      return (
        <>
          {this.state.visibleHead?<Header name="Today"/>:null}
           <MyDay checkPage={this.checkPage} 
           onComplite={this.onComplite} 
           data={this.state.data} 
           uploadDataState={this.uploadDataState}
           buttonAdd={this.buttonAdd}
           date={this.state.date}
           flag={true}
           onVisibleHead={this.onVisibleHead}
           nextFlag={true}
           />
        </>
      
      )
    }
    if(page==='today'){
      return (
        <>
           {this.state.visibleHead?<Header name="Today"/>:null}
           <MyDay checkPage={this.checkPage} 
           onComplite={this.onComplite} 
           data={this.state.data} 
           uploadDataState={this.uploadDataState}
           buttonAdd={this.buttonAdd}
           flag={false}
           onVisibleHead={this.onVisibleHead}
           />
        </>
      
      )
    }
    if(page==='statistics'){
      return (
        <>
         {this.state.visibleHead?<Header name="Statistics"/>:null}
          <Statistic checkPage={this.checkPage}/>
        </>
      )
    }
    if(page==='nextDay'){
      return(
        <>
          {this.state.visibleHead?<Header name="Next day"/>:null}
          <NextDay checkPage={this.checkPage} 
          data={this.state.data} 
          uploadDataState={this.uploadDataState} 
          onComplite={this.onComplite}
          flag={false}
          buttonAdd={this.buttonAdd}
          onVisibleHead={this.onVisibleHead}
          />
      </>
      )
    }
    if(page==='myDays'){
      return(
        <>
             {this.state.visibleHead?<Header name="My days"/>:null}
        <MyDays checkPage={this.checkPage} 
        data={this.state.data} 
        uploadDataState={this.uploadDataState}
        openPage={this.openPage}
        onVisibleHead={this.onVisibleHead}
        />
       </>
      )
    }//<AddPage checkPage={this.checkPage} uploadDataState={this.uploadDataState}/>
  }
 
  render(){
    console.log(localStorage.getItem('data')==null)
    return (
      <div className='globalApp'>
         {this.onLoadPage(this.state.page)}
      </div>
  ); 
}
}




export default App;
