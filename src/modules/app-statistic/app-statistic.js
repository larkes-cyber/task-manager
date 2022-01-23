import './app-statistic.css';
import NavBar from '../app-nav-bar/app-nav-bar';
import Diagramm from '../app-goal-value/img/diagramma.png';
import Chart from 'chart.js/auto';
import React, { Component } from 'react';

/*
const myCharts=document.createElement('canvas')
      myCharts.className="stata";
        const ctx=myCharts;
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        */
class Statistic extends Component{
     onAttue=(e)=>{
        return e.target.getAttribute('data-page');
      }
      state={
        countTotalGoals:0,
        countComplDays:0,
        countSetGoals:0
      }
      componentDidMount(){
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
         this.setState({
            countTotalGoals,
            countComplDays,
            countSetGoals
         })
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
          document.querySelector('.contain').append(myCharts);
        const myChartes=document.createElement('canvas');
        myChartes.style.width="100px";
        myChartes.style.height="100px";
            const ctxsec=myChartes.getContext('2d');
            ctxsec.canvas.style.width="100px";
            ctxsec.canvas.style.height="100px";
            const myChartsec = new Chart(ctxsec, {
                type: 'polarArea',
                data : {
                    datasets: [{
                        data: [5,4,3,8,6,10,2],
                        backgroundColor: ["#19C70E", "#A0E01B","#EE05F2","#8200FF","#FF173C","#05FCFF","#05FFAB"]
                    }],
                
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday'
                    ]
                }
                // type: 'bar',
                // data: {
                //   labels: ["10:00", "11:00", "12:00", "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                //   datasets: [
                //     {
                //       label: "Population (millions)",
                //       backgroundColor: ["#FDBBFD", "#871BE3","#871BE3","#1B63E3","#FDBBFD","#1B63E3", "#1B63E3","#3C2AFA","#1ED0FD","#1ED0FD","#FDBBFD", "#1ED0FD","#1ED0FD","#FDBBFD"],
                //       data: [5,2,2,8,3,12,13,15,3,7,6,3]
                //     }
                //   ]
                // },
                // options: {
                //   legend: { display: false },
                //   title: {
                //     display: true,
                //     text: 'Predicted world population (millions) in 2050'
                //   }
                // }

        } );
        myChartes.style.width="100px";
        myChartes.style.height="100px";
            document.querySelector('.containSec').append(myChartes);
          
      }
      render(){
        return(
            <div className='wallForStat'>
                <div className='baseStatic'>
                 <NavBar checkAttue={(e)=>this.props.checkPage(this.onAttue(e))}/>
                    <div>
                        <div className='bloksStatic'>
                            <div className='blockStatistic blockGreen'>Goals complited: {this.state.countTotalGoals}</div>
                            <div className='blockStatistic blockOrange'>Days complited: {this.state.countComplDays}</div>
                            <div className='blockStatistic blockBlue'>Goals set: {this.state.countSetGoals}</div>
                        </div>
                        <div className='contain'>
                        </div>
                        <div className='containSec'>
                        </div>
                    </div>
                </div>
                
    
            </div>
        )
      }

}
export default Statistic;