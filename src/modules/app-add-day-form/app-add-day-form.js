import './app-add-day-form.css';
import React, {Component} from 'react';
import priorBut from '../app-goal-value/img/priorBut.png';
import butUp from '../app-goal-value/img/butUp.png';
import butDown from '../app-goal-value/img/butDown.png';
import butCancel from '../app-goal-value/img/cancel.png';
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
            errorOn:false

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
    onCheckDataForm=(e)=>{
        this.props.onVisibleHead();
        const elems=e.target.parentElement.childNodes;
        let goals=[];
        let errorFlag=true;
        let errorTime=true,
            errrorEmpInp=true;
        elems.forEach(item => {
            console.log(item)
            if(item.classList.contains('listGoals')){
                item.childNodes.forEach(item=>{
                        const forms=item.childNodes;
                        let goal='';
                        let date='';
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
                                            status:false
                                        })
                                    }
                                }
                            }
                        }) 
            }

        });
        if(!(errrorEmpInp && errorTime)){
            errorFlag=false;
        }
        else{
            errorFlag=true;
        }
        if(errorFlag){
            const elemsData=e.target.parentElement.parentElement.firstChild.childNodes;
            let dateInput='';
            console.log(elemsData)
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
    render(){
        const arrForms=[];
        for(let i=0;i<this.state.count;i++){
            if(i==0 && this.state.flag<2){
                arrForms.push(
                    <form action="" className="itemForm">
                        <img src={priorBut} data-change='prior' onClick={this.onChangePriority} alt="" data-active='passive' className="ping passive"/>
                        <input type="text" className="date stText" {...this.state.date} onClick={this.changeStVal}/>
                        <input type="text" className="goal stText" {...this.state.goal} onClick={this.changeStVal}/>
                    </form>
                );
            }
            else{
                arrForms.push(
                    <form action="" className="itemForm">
                        <img src={priorBut} data-change='prior' onClick={this.onChangePriority} alt="" data-active='passive' className="ping passive"/>
                        <input type="text" className="date"/>
                        <input type="text" className="goal"/>
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

