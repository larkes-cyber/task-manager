import React, { Component } from 'react';
import './main-goals-app.css';
//FavIcon.png
import FavIcon from '../app-goal-value/img/FavIcon.png';
import AddBu from '../app-goal-value/img/add2.png';
import delite from '../app-goal-value/img/del.png';
import ok from '../app-goal-value/img/ok.png';
import Chart from 'chart.js/auto';
class MainGoals extends Component{

    constructor(props){
        super(props);
        this.state={
           data:(localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[],
            count:(localStorage.getItem('mainGoals')!=null)?+JSON.parse(localStorage.getItem('mainGoals')):0,
            form:true
     
        }
    }
    // {
    //     type:'form',
    //     id:1
    // }
    toPlusForm=()=>{
        if(this.state.form){
            this.setState(state=>({
                data:[...state.data,{type:'form'}]
            }))
        }
        this.setState(state=>({
            form:false
        }))


    }
    sumbitForm=(e)=>{
        const info=e.target.parentNode.parentNode.childNodes[0].value;
        let data=this.state.data;
        const realId=data[data.length-2]===undefined?1:data[data.length-2].range+1;
        let count=localStorage.getItem('count')!=null?+localStorage.getItem('count')+1:0;
        data=data.filter(item=>item.type!=='form');
        data.push({
            type:'goal',
            id:count,
            goal:info,
            count:0,
            range:realId
        });
        this.setState(state=>({
            data,
            count:state.count+1,
            form:true
        }))
        localStorage.setItem('mainGoals',JSON.stringify(data));
        localStorage.setItem('count',JSON.stringify(count));
    }
    delFrom=()=>{
        let data=this.state.data;
        data=data.filter(item=>item.type!=='form');
        this.setState(state=>({
            data,
            form:true
        }))
        localStorage.setItem('mainGoals',JSON.stringify(data));
    }
    daysInMonth=(m, y)=>{
        return m===2?y&3||!(y%25)&&y&15?28:29:30+(m+(m>>3)&1);
      }
    getTime=()=>{
         let day=new Date().getDate()+1,
             month=new Date().getMonth()+1,
             lastDay='',
             lastMonth='';
            if(day-7<=0){
            lastDay=this.daysInMonth(month-1,22)+(day-7);
            lastMonth=month-1;
            }
            else{
            lastDay=day-7;
            lastMonth=month;
            }
           const array=[];
           while((day!=lastDay)&&((month!=lastMonth)||(month==lastMonth))){
                array.push(`${(lastDay+'').length==1?'0'+lastDay:lastDay}.${(lastMonth+'').length==1?'0'+lastMonth:lastMonth}.22`);
                if((lastDay+1>this.daysInMonth(month-1,22))&&(lastMonth!=month)){
                    lastDay=1;
                    lastMonth++;
                }
                else{
                lastDay++;
                }
         }
        //['23.01.22','24.01.22','25.01.22'...]
       return array;
      }
    getDataForDiagramm=(selector)=>{
        const arrayDate=this.getTime();
        const data=(localStorage.getItem('data')!=null)?JSON.parse(localStorage.getItem('data')):[];
        let outputStatic={};
        arrayDate.forEach(item=>{
            outputStatic[item]=0;
        })
        console.log(data);
        arrayDate.forEach(item=>{
            data.forEach(elem=>{
                if(item===elem.date){
                    elem.goals.forEach(elem=>{
                        if((elem.branch===selector)&&(elem.status)){
                            outputStatic[item]+=1;
                        }
                    })
                }
            })
        })
        return outputStatic;
    }
    getDiagramm=(selector,elem)=>{
        const data=this.getDataForDiagramm(selector),
        dataLabels=[],
        dataForLabels=[];
        console.log(selector)
        for(var item in data){
            dataLabels.push(item);
            dataForLabels.push(data[item]);
        }
        console.log(dataLabels,dataForLabels);
        const myChartes=document.createElement('canvas');
        myChartes.style.width="100px";
        myChartes.style.height="100px";
            const ctxsec=myChartes.getContext('2d');
            ctxsec.canvas.style.width="100px";
            ctxsec.canvas.style.height="100px";
            const myChartsec = new Chart(ctxsec, {
                type: 'line',
            data: {
                labels: dataLabels,
                datasets: [{ 
                    data: dataForLabels,
                    label: "Complited goals for it",
                    borderColor: "#3C2AFA",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                display: true,
                text: 'World population per region (in millions)'
                }
            }

                    } );
            myChartes.style.width="360px";
            myChartes.style.height="400px";
            elem.append(myChartes);
    }
    openSorce=(e)=>{
        this.setState({
            data:(localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[]
        })
        if(e.target.parentNode.parentNode.classList.contains('forDiagramm')){
            e.target.parentNode.parentNode.classList.remove('forDiagramm');
            e.target.parentNode.parentNode.childNodes[1].className='noPacificContent';
            const elem=e.target.parentNode.parentNode.childNodes[1].childNodes[1]
            elem.removeChild(elem.firstChild);
            return;
        }
        e.target.parentNode.parentNode.childNodes[1].className='';
        e.target.parentNode.parentNode.className+=' forDiagramm';
        const id=e.target.parentNode.parentNode.getAttribute('mainGoal');
       this.getDiagramm(id,e.target.parentNode.parentNode.childNodes[1].childNodes[1]);

    }
    removeMainGoal=(e)=>{
        const elemId=e.target.parentNode.parentNode.parentNode.getAttribute('mainGoal');
        let data=this.state.data;
        data=data.filter(item=>item.id!==+elemId);
        data=data.map((item,i)=>({type:item.type,range:i+1,id:item.id,goal:item.goal,count:item.count}));
        console.log(data);
        this.setState(state=>({
            data
        }))
        localStorage.setItem('mainGoals',JSON.stringify(data));
    }
    render(){
        const data=this.state.data;
        const output=[];
        data.forEach(item=>{
            if(item.type==='form'){
                output.push(
                    <form className='itemForms itemFormsMain'>
                      <input type="text" className="Addgoal addMainGoal"/>
                       <div className='change changeMain'>
                            <img src={delite} className="del delMain" data-change='del' onClick={this.delFrom} alt=""/>
                            <img src={ok} className="ok okMain" data-change='ok' onClick={this.sumbitForm} alt="" />
                       </div>
                    </form>
                )
            }
            else{
                const countFromFun=this.getDataForDiagramm(item.id+'');
                let sum=0;
                for(var n in countFromFun){
                    sum+=countFromFun[n];
                }
                console.log(sum);
                output.push(
                    <div className='mainGoalDiv' mainGoal={item.id}>
                        <div className='textAndIcMain'>
                            <p className='mainGoal'>{`${item.range}. ${item.goal}`}</p>
                            <img src={FavIcon} className='favIc' onClick={this.openSorce} alt="" />
                        </div>
                        <div className='noPacificContent bottomContent'>
                            <div className={this.props.fix?"goalStat":"goalStatFix"}>complited goals: {sum}</div>
                            <div className='containMain'></div>
                            <div className='fixRem'>
                                <div className={this.props.fix?"goalMainRem":"goalMainRemFix"} onClick={this.removeMainGoal}>remove</div>
                            </div>
                        </div>  
                    </div>//goalStatFix
                ) 
            }
        })
        return(//mainGoalTitle
            
                <div className='mainGoalsDiv'>
                    <div className='mainGoalsInner'>
                        <h1 className={this.props.fix?"mainGoalTitle":"mainGoalTitleFix"}>Main goals:</h1>
                        <div className='mainGoalContent'>
                            {output}
                        </div>
                        <div className='addBu'  onClick={this.toPlusForm}>
                                <img src={AddBu} className='addBuImg' alt="" />
                                <p className='addBuText'>add</p>
                        </div>
                    </div>
                </div>
        )
    }
}
export default MainGoals;