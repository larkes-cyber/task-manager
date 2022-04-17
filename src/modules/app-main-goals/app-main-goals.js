import './app-main-goals.css';
import down from '../app-goal-value/img/down.png';
import NavBar from '../app-nav-bar/app-nav-bar'; 
import starImg from '../app-goal-value/img/images/star.png';
import { useState } from 'react';
import object from '../service/service';
import Chart from 'chart.js/auto';
import addButton from '../app-goal-value/img/images/addButtonMainGoal.png';
import AddMainGoalForm from '../add-main-goal-form/add-main-goal-form';


const AppMainGoals = (props) => {

    const images = object;
    const [data, setData] = useState((localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[])
    const [onShowForm,setOnShowForm] = useState(false);


    const onAttue=(e)=>{
        return e.target.getAttribute('data-page');
    }

    const daysInMonth=(m, y)=>{
        return m===2?y&3||!(y%25)&&y&15?28:29:30+(m+(m>>3)&1);
      }
    const getTime=()=>{
         let day=new Date().getDate()+1,
             month=new Date().getMonth()+1,
             lastDay='',
             lastMonth='';
            if(day-7<=0){
            lastDay=daysInMonth(month-1,22)+(day-7);
            lastMonth=month-1;
            }
            else{
            lastDay=day-7;
            lastMonth=month;
            }
           const array=[];
           while((day!=lastDay)&&((month!=lastMonth)||(month==lastMonth))){
                array.push(`${(lastDay+'').length==1?'0'+lastDay:lastDay}.${(lastMonth+'').length==1?'0'+lastMonth:lastMonth}.22`);
                if((lastDay+1>daysInMonth(month-1,22))&&(lastMonth!=month)){
                    lastDay=1;
                    lastMonth++;
                }
                else{
                lastDay++;
                }
         }
       return array;
      }
    const getDataForDiagramm=(selector)=>{
        const arrayDate=getTime();
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
    const getDiagramm=(selector,elem)=>{
        let data=getDataForDiagramm(selector),
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



    const changeActivity = (e) => {

        const nowGoal = e.currentTarget;

        if (!nowGoal.classList.contains('activeGoal')){

            nowGoal.className = "activeGoal";

            nowGoal.childNodes[1].className = 'partOfStatistics';

            nowGoal.childNodes[0].childNodes[2].className = 'downImg';



            openSorce(e);
        }
        else{
            nowGoal.className = "some-main-goal";

            nowGoal.childNodes[1].className = 'hideForStatic';

            const elem = nowGoal.childNodes[1].childNodes[1];

            nowGoal.childNodes[0].childNodes[2].className = 'flipImg';

            elem.removeChild(elem.childNodes[0])
        }
    }




    const openSorce=(e)=>{
        const nowGoal = e.currentTarget,
            id = nowGoal.getAttribute("mainGoal"),
            elem = nowGoal.childNodes[1].childNodes[1];
            getDiagramm(id,elem);
    }

  
    const MainGoals = data.map(item => (
      <div className="some-main-goal" mainGoal = {item.id} onClick={changeActivity}>
          <div className='forPress'>
              <img src={starImg} className="flipImg" alt="" />
               <p className='main-goal-name'>{item.goal}</p>
               <img src={down} className="flipImg" alt="" />
          </div>
          <div className='hideForStatic'>
            <div className="goalStat">complited goals: {item.count}</div>
            <div className='containMain'></div>
            <div className='fixRem'>
                <div className="goalMainRem">remove</div>
            </div>
          </div>
      </div>
    ))

    return(
        <div className='App'>
            {onShowForm ? <AddMainGoalForm setOnShowForm = {(goals) => {
               
                if(goals != null) setData(goals);
                setOnShowForm(false);
                
            }}/> : null}
            <div className='part'>
               <NavBar checkAttue={(e)=>props.checkPage(onAttue(e))}/>
               <div>
                   <div className="app-main-goals">
                    {MainGoals}
                    <div className='addBlockButton' onClick={() => setOnShowForm(true)}>
                        <img src={addButton} className='iconForAddBlockButton' alt="" />
                        <p className='textForAddBlockButton'>Add</p>
                    </div>
                    </div>       
               </div>
            </div>
        </div>
       
    )
}

export default AppMainGoals;