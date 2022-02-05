import Chart from 'chart.js/auto';
import '../app-statistic.css';
import { useEffect,useState } from 'react';
const TotalStatic=()=>{
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
                    data: [countTotalGoals,countSetGoals,countComplDays],
                    backgroundColor: [
                        '#4BBF89',
                        '#41AED9',
                        '#EE05F2'//#EE05F2
                    ]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Total goals completed',
                    'Goals set',
                    'Day completed'
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
        <div className='someStatic totalStatic totalStaticMe'>
            <div className='bloksStaticForTotal'>
                <div className='blockStatistic blockGreen bloksStaticForTotalText'>Goals complited: {countTotalGoals}</div>
                <div className='blockStatistic blockOrange bloksStaticForTotalText'>Days complited: {countComplDays}</div>
                <div className='blockStatistic blockBlue bloksStaticForTotalText fixBlockStaicTotal'>Goals set: {countSetGoals}</div>
            </div>
            <div className='rameForStatic rameForStatictgTotal'>
             <div className='contain'>     
             </div>
            </div>
        </div>
    )
}
export default TotalStatic;