import Chart from 'chart.js/auto';
import '../app-statistic.css';
import { useEffect,useState } from 'react';
const DistractionsStatic=()=>{
    const [countTotalGoals,setCountTotalGoals]=useState(),
    [countComplDays,setCountComplDays]=useState(),
    [countSetGoals,setCountSetGoals]=useState()
    useEffect(()=>{
        let countTotalGoals=0,
        countComplDays=0,
        countSetGoals=0;
        const array=JSON.parse(localStorage.getItem('data'));
        if(array){
        array.forEach(item => {
            if(item.flag){
                countComplDays++;
            }
            item.goals.forEach(elem=>{
                if(elem.status){
                    countTotalGoals++;
                }
                else{
                    countSetGoals++;
                }
            })
        });
        }
        setCountTotalGoals(countTotalGoals);
        setCountComplDays(countComplDays);
        setCountSetGoals(countSetGoals);
        const dataForDiagrammFromBase=JSON.parse(localStorage.getItem('forStatic'));
        const dataForDiagramm=[];
        for(let n in dataForDiagrammFromBase){
            dataForDiagramm.push(dataForDiagrammFromBase[n]);
        }
        const myCharts=document.createElement('canvas');
        myCharts.style.width="100px";
        myCharts.style.height="100px";
        const ctx=myCharts.getContext('2d');
        ctx.canvas.style.width="100px";
        ctx.canvas.style.height="100px";
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data:{
                datasets: [{
                    data: dataForDiagramm,
                    backgroundColor: [
                        '#4BBF89',
                        '#EE05F2',
                        '#1ED0FD',
                        '#871BE3',
                        '#FDBBFD'
                    ]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Unsuitable time',
                    'Contingencies',
                    'Laziness',
                    'Alternative',
                    'Other'
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        myCharts.style.width="100px";
        myCharts.style.height="100px";
        document.querySelector('.contain').append(myCharts)
    },[]);
    return(
        <div className='someStatic totalStatic totalDistStatic'>
            <div className='bloksStatic'>
                <div className='blockStatistic blockStatisticDist blockGreen'>Unsuitable time</div>
                <div className='blockStatistic blockStatisticDist blockOrange'>Contingencies</div>
                <div className='blockStatistic blockStatisticDist blockBlue'>Laziness</div>
                <div className='blockStatistic blockStatisticDist blockPur'>Alternative</div>
                <div className='blockStatistic blockStatisticDist blockYel'> Other</div>
            </div>
            <div className='rameForStatic rameForDisStatic'>
             <div className='contain'>     
             </div>
            </div>
        </div>
    )
}
export default DistractionsStatic;