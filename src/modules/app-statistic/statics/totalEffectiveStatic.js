import Chart from 'chart.js/auto';
import '../app-statistic.css';
import { useEffect,useState } from 'react';
const TotalEffectiveStatic=()=>{
   
    useEffect(()=>{
        const getTotalCountForDay=(str)=>{
            let TotalCount=0;
            let flag=true;

            JSON.parse(localStorage.getItem('data')).forEach(item=>{
                if(flag){
                    const itemVal=item.constOfReson;
                    const numberOfNoComplitedGoal=itemVal===undefined?false:itemVal>=0;
                    item.goals.forEach(item=>{
                        if(item.status){
                        if(item.branch||item.priority){
                            TotalCount+=2;
                        }
                        if(item.branch&&item.priority){
                            TotalCount+=3;
                        } 
                        else{
                            TotalCount++;
                        }
                        }
                        else{
                            if(!numberOfNoComplitedGoal){
                                if(item.branch||item.priority){
                                    TotalCount-=2;
                                }
                                if(item.branch&&item.priority){
                                TotalCount-=3;
                                } 
                                else{
                                TotalCount--;
                                }
                            }
                        }
                    })
                }
            if(item.date===str){
                flag=false
            }
            })
            return TotalCount;
        }
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
      const getDataForWeekStatic=()=>{
                let Data=JSON.parse(localStorage.getItem('data')),
                arrayOfElems=[],
                arrayValueOfElems=[];
                let k=Data.length-1;
                let flag=false;
                const nowDay=getNowDay();
                Data.forEach((item,i)=>{
                    if(item.date===nowDay){
                        k=i;
                    }
                });
                while (k>=0){
                    arrayOfElems.push(Data[k].date)
                    k-=3;
                }
                arrayOfElems.forEach(item=>{
                    arrayValueOfElems.push(getTotalCountForDay(item))
                })
                arrayOfElems=arrayOfElems.reverse();
                arrayValueOfElems=arrayValueOfElems.reverse();
                return [arrayOfElems,arrayValueOfElems];
        }
          const myChartes=document.createElement('canvas');
            myChartes.style.width="700px";
            myChartes.style.height="850px";
            const ctxsec=myChartes.getContext('2d');
            ctxsec.canvas.style.width="700px";
            ctxsec.canvas.style.height="850px";
            const [secondLebals,secondData]=getDataForWeekStatic();
            const myChartsec = new Chart(ctxsec, {
                type: 'line',
                data: {
                    labels: secondLebals,
                    datasets: [{ 
                        data: secondData,
                        label: "Totlal value",
                        borderColor: "rgba(30, 208, 253, 1)",
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
        myChartes.style.width="700px";
        myChartes.style.height="850px";
        document.querySelector('.containSec').append(myChartes);
       
    },[]);
    return(
        <div className='someStatic totalEffectiveStatic'>
            <div className='titleStaticEffective'>The total static of the effectiveness of the goals:</div>
            <div className='rameForStatic rameForStaticEffective'>
                <div className='containSec'>     
                </div>
            </div>
        </div>
    )
}
export default TotalEffectiveStatic;