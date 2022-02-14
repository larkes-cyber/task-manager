import './app-add-day-form.css';
import React, {Component} from 'react';
import priorBut from '../app-goal-value/img/priorBut.png';
import butUp from '../app-goal-value/img/butUp.png';
import butDown from '../app-goal-value/img/butDown.png';
import butCancel from '../app-goal-value/img/cancel.png';
import branch from '../app-goal-value/img/branch.png';
import { LogarithmicScale } from 'chart.js';
class AddDayForm extends Component{
    constructor(props){
        super(props);
        this.state={
            count:7,
            hide:false,
            down:false,
            k:0,
            flag:0,
            goal:{value:'Ваша цель'},
            date:{value:'00:00'},
            errorOn:false,
            flagListGoals:true,
            flagStat:true

        }
    }
    addError=(err)=>{
        const error=document.createElement('p');
        if(err=='empT'){
            error.textContent="Some input is empty";
     
        }
        if(err=='incT'){
            error.textContent="Incorrect time";
        }
        if(err==='rep'){
            error.textContent='You have repid goals';
            error.className='Error';
            error.className+=' repError';
            return error;
        }
        if(err==='date'){
            error.textContent="Incorrect date";
            error.className='Error';
            error.className+=' dateError';
            return error;
        }
         error.className='Error';
         return error;//repError
    }
    isCorrectTime=(time)=>{
        let flag1=true;
        let flag2=false;
        let flag3=false;
        for (let index = 0; index < time.length; index++) {
            const item = time[index];
            if(item===':'){
                flag2=true;
            }else{
                if(isNaN(item)){
                    
                    flag1=false
                }
            } 
        }
        let hours='',
            min='';
        if(time.length===4){
             hours=+time.substr(0,1);
             min=+time.substr(2,4);
        }
       else{
           
             hours=+time.substr(0,2);
             min=+time.substr(3,5);
       }
        if(hours<24 && min<60){
            flag3=true;
        }
        console.log(flag1,flag2,time.length===5 || time.length===4)
        return flag1 && flag2 && flag3 && (time.length===5 || time.length===4);
    }
    isRepidErr=(item)=>{
        let flag=true;
        const array=item.childNodes;
        array.forEach(item=>{
            if(item.classList.contains('Error')){
                flag=false;
            }
        })
        return flag;
    }
    getNowDay=()=>{
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
    onCheckRealDate=(date)=>{
        console.log('check',date)
        let dateNow=+(new Date());
        let lastMounth='';
        let lastDay='';
        if(date.length!==8) return false;
        let flag=true;
        let flagNoRange=true;
        let day=true;
        let mounth=true;
        let flagRealDate=true;
        for(let i = 0; i < date.lenght; i++){
            let item=date[i];
            if(!(isNaN(item)||item==='.')){
                flag=false;
            }
        }
        let count=0;
        for(let i = 2; i < date.length; i++){
            if(date[i]==='.'){
                const num= +(date[i-2]+date[i-1]);
                count++;
                if(count===1){
                    lastDay=num
                    day=num<=31&&num>=1;
                }
                else{
                    lastMounth=num
                    mounth=num<=12&&num>=1;
                }
                if(!(date[i-1]!=='.'&&date[i-2]!=='.')){
                    flagNoRange=false;
                }
            }
        }
       
        flagNoRange=(count===2)&&(flagNoRange)&&(day&&mounth);
        console.log('check',flag,flagNoRange)
        const lastDate=+(new Date(2022,lastMounth-1,lastDay));
  
        //const flagCorrect=lastDate>dateNow;
        return flag&&flagNoRange&&(lastDate>dateNow);
    }
    onCheckDataForm=(e)=>{
        this.props.onVisibleHead();
        const elems=e.target.parentElement.childNodes;
        const forDate=e.target.parentElement.parentElement.childNodes[0].childNodes[1].value;
        let goals=[];
        let errorFlag=true;
        let errorTime=true,
            errrorEmpInp=true,
            errorDate=this.onCheckRealDate(forDate);
        console.log('lolka',forDate)
        elems.forEach(item => {
            console.log(item)
            if(item.classList.contains('listGoals')){
                item.childNodes.forEach(item=>{
                        const forms=item.childNodes;
                        let goal='';
                        let date='';
                        let branch='';
                        let flag=false;
                        forms.forEach(item=>{
                                if(item.classList.contains('date')){
                                    date=item.value;
                                }
                                if(item.classList.contains('goal')){
                                    goal=` ${item.value}`;
                                }
                                if(item.getAttribute('active')==='unpassive'){
                                    flag=true;
                                }
                                if(item.classList.contains('kostily')){
                                    branch=item.getAttribute('data-keyGoal');
                                }
                            })
                            if(!(date.length===0 && goal.length===1)){  
                                if(((date.length===0||date==='00:00') && goal.length>1)||((goal.length<=1||goal===' Ваша цель') && date.length>1)){
                                const err=this.addError('empT');
                                    if(this.isRepidErr(item)){
                                        item.append(err);
                                    }
                                    errrorEmpInp=false;
                                }
                                if(this.isCorrectTime(date)){
                                    item.childNodes.forEach(elem=>{
                                        if(elem.classList.contains('Error')){
                                            item.removeChild(elem);
                                        }
                                    })
                                }
                                if(!(this.isCorrectTime(date))){
                                    const err=this.addError('incT');
                                    if(this.isRepidErr(item)){
                                        item.append(err);
                                    }
                                    errorTime=false; //incT
                                }
                               
                                else{
                                    if(goal.length>1 && date.length>1){
                                        goals.push({
                                            goal:date+goal,
                                            priority:flag,
                                            status:false,
                                            branch:branch
                                        })
                                    }
                                    
                                }
                            }
                        }) 
            }

        });

       
        if(!errorDate){
            errorFlag=true;
        }
        else{
            errorFlag=true;
        }
        if(!(errrorEmpInp && errorTime)){
            errorFlag=false;
        }
        if(errorFlag){
            const elemsData=e.target.parentElement.parentElement.firstChild.childNodes;
            let dateInput='';
            const elem=e.target.parentElement.parentElement.firstChild;
            if(!errorDate){
                if(!elem.classList.contains('withError')){
                    elem.append(this.addError('date'));
                    elem.className+=' withError';
                }
            }
            else{
                if(elem.classList.contains('withError')){
                    elem.className='addDate';
                }
                elemsData.forEach(item=>{
                    if(item.classList.contains('inpur')){
                        dateInput=item.value;
                    }
                })
                //console.log([goals,dateInput])
                const provArr=goals;
                let book=new Set();
                let flagRepit=true;
                console.log(provArr)
                for (let index = 0; index < provArr.length; index++) {
                    const item=provArr[index].goal.substr(0,5);
                    console.log(item)
                    if(!(book.has(item))){
                        book.add(item)
                    }
                    else{
                        flagRepit=false;
                    }
                }
                if(flagRepit){
                    console.log([goals,dateInput])
                    this.props.changeState([goals,dateInput]);
                }
                else{
                    // document.querySelector('.listPlan').forEach(item=>{
                    //     if(item.classList.contains('Error')){

                    //     }
                    // })isRepidErr
                    const elem=document.querySelector('.listPlan');
                    if(this.isRepidErr(elem)){
                        elem.append(this.addError('rep'));
                    } 
                }
        }
        }
    }
    unHideElem=()=>{
        this.setState({
            down:true
        })
        if(this.state.k==1){
            document.querySelector('.listGoals').className='listGoals';
            this.setState({
                hide:false
               
            });
        }
        const array=document.querySelector('.listGoals').childNodes;
        array[7+this.state.k-1].className+=' gide';
        document.querySelector('.listGoals').childNodes[this.state.k-1].className='itemForm';
        this.setState({
            k:this.state.k-1
        })
    }
    unHideDownElem=()=>{
        const array=document.querySelector('.listGoals').childNodes;
        console.log(this.state.k+7-1,array.length)
        this.setState({
            hide:true
        })
        if(this.state.k+8==array.length){
            this.setState({
                down:false
            });
        }
        document.querySelector('.listGoals').childNodes[this.state.k].className+=' gide';
        // console.log(7+this.state.k+1);
        this.setState({
            k:this.state.k+1
        });
        array[7+this.state.k].className='itemForm';
        document.querySelector('.listGoals').className+=' fixListGoals';
 
    }
    addForm=()=>{
        this.setState({
            count:this.state.count+1,
            hide:true,
            k:this.state.k+1
        })
        // if(this.state.count>0){
        //     document.querySelector('.listGoals').childNodes[0].className+=' gide';
        // }
        document.querySelector('.listGoals').className+=' fixListGoals';
        document.querySelector('.listGoals').childNodes[this.state.k].className+=' gide';
 
    }
    changeStVal=(e)=>{
        e.target.value="";
        e.target.className=e.target.className.substr(0,5);
        e.target.onClick="";
        this.setState({
            flag:this.state.flag+1,
            goal:null,
            date:null
        })

    }
    hideForm=()=>{
        this.props.onHideForm();
        this.props.onVisibleHead();
    }
    onChangePriority=(e)=>{
        if(e.target.getAttribute('active')==='unpassive'){
            e.target.setAttribute('active','passive');
            e.target.className='passive ping';
        }
        else{
            e.target.setAttribute('active','unpassive');
            e.target.className='unpassive ping';
        }
       // const elem=e.target.getAttribute('active')e.target.setAttribute('active','unpassive');
    }
    activeBranch=(e)=>{
         const elem=e.target.parentNode.childNodes[1];
        if(elem.classList.contains('hideBranch')&&this.state.flagListGoals){
            e.target.parentNode.childNodes[1].className='listMainGoals downBranch';
            this.setState(state=>({
                flagListGoals:false
            }))
            e.target.parentNode.childNodes[1].childNodes.forEach(item=>{
                item.childNodes[0].checked=false;
            })
            return; 
        }
        elem.className+=' hideBranch';
        this.setState(state=>({
            flagListGoals:true
        }))
    }
    sumbitBranch=(e)=>{
        const elem=e.currentTarget;
        let check='';
        elem.parentNode.childNodes.forEach(item=>{
            if(item.childNodes[0].checked){
                check=item.childNodes[0].getAttribute('data-id');
            }
        })
        elem.parentNode.parentNode.parentNode.setAttribute('data-keyGoal',`${check}`);
        console.log(elem.parentNode.parentNode.parentNode.getAttribute('data-keyGoal'))
        elem.parentNode.parentNode.className+=' hideBranch';
        console.log(elem.parentNode.parentNode.className)
            this.setState(state=>({
                flagListGoals:true
            }))
    }
    changeRadio=(e)=>{
        e.target.parentNode.parentNode.childNodes.forEach(item=>{
            item.childNodes[0].checked=false
        })
        e.target.checked=true;
    }
    render(){
        const arrForms=[];
        const branchNodes=(localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[]
        let arrayMainGoals=[]
              branchNodes.forEach(elem=>{
                  const id= elem.id,
                  goal=elem.goal;
                  arrayMainGoals.push({
                        goal:goal,
                        id:id
                  })
              })
             
              console.log(arrayMainGoals)
              arrayMainGoals=arrayMainGoals.map(item=>(
                <div className='mainBlockGoals'  onClick={this.changeRadio}>
                    <input type="checkbox" id="contactChoice1" name="contact" data-id={item.id}/>
                    <p className='mainGoalChoice'>{item.goal}</p>
                </div>
              ))
              
        for(let i=0;i<this.state.count;i++){
            if(i==0 && this.state.flag<2){
                arrForms.push(
                    <form action="" className="itemForm">
                        <img src={priorBut} data-change='prior' onClick={this.onChangePriority} alt="" data-active='passive' className="ping passive"/>
                        <input type="text" className="date stText" {...this.state.date} onClick={this.changeStVal}/>
                        <input type="text" className="goal stText" {...this.state.goal} onClick={this.changeStVal}/>
                        <div className='kostily'>
                         <img src={branch} className='brnImg' onClick={this.activeBranch} alt="" />
                         <div className='listMainGoals hideBranch'>
                            <h1 className='titleSpanMainGoal' >Classificate goal:</h1>
                            <div className='innerListMainGoals'>
                               {arrayMainGoals}
                               <div className='mainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0'  />
                                    <p className='mainGoalChoice'>default</p>
                                </div>
                               <div className='butAddBrain' onClick={this.sumbitBranch}>
                                   <p className='textButAddBrain'>OK</p>
                               </div>
                            </div> 
                            {/* <p onClick={this.changeRadio}>as das as ad as </p>
                            <div onClick={this.changeRadio}>as das as ad as </div> */}
                         </div>
                        </div>
                    </form>
                );
            }
            else{
                arrForms.push(
                    <form action="" className="itemForm">
                        <img src={priorBut} data-change='prior' onClick={this.onChangePriority} alt="" data-active='passive' className="ping passive"/>
                        <input type="text" className="date"/>
                        <input type="text" className="goal"/>
                        <div className='kostily'>
                         <img src={branch} className='brnImg' onClick={this.activeBranch} alt="" />
                         <div className='listMainGoals hideBranch'>
                            <h1 className='titleSpanMainGoal'>Classificate goal:</h1>
                            <div className='innerListMainGoals' >
                               {arrayMainGoals}
                               <div className='mainBlockGoals'>
                                    <input type="checkbox" id="contactChoice1" name="contact" data-id='0' onClick={this.changeRadio} />
                                    <p className='mainGoalChoice'>default</p>
                                </div>
                               <div className='butAddBrain' onClick={this.sumbitBranch}>
                                   <p className='textButAddBrain'>OK</p>
                               </div>
                            
                            </div>
                            {/* <p onClick={this.changeRadio}>as das as ad as </p>
                            <div onClick={this.changeRadio}>as das as ad as </div> */}
                         </div>
                        </div>
                    </form>
                );
            }
            
        }
        return(
            <div className='addGoalsList'>
             <img src={butCancel} className='butCancel' onClick={this.hideForm} alt=""/>
                <div className="form">
                    <form action="" className="addDate">
                        <h1 className="Date">Date</h1>
                        <input type="text" value={this.props.day} className="inpur"/>
                    </form>
                    <div className="listPlan">
                        <h1 className="Date plans">My plans:</h1>
                        {this.state.hide?<img src={butUp}  className="butUp" alt="" onClick={this.unHideElem}/>:null}
                        <div className="listGoals">
                            {arrForms}
                        </div>
                        {this.state.down?<img src={butDown} className="butDown"  alt="" onClick={this.unHideDownElem}/>:null}
                        <p className="more" onClick={this.addForm}>More</p>
                        <button className="butOk" onClick={this.onCheckDataForm}>ADD</button>
                    </div>
                </div>
             </div>
        )
    }
}
export default AddDayForm;

