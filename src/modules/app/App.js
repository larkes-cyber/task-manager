
import './App.css';
import MyDay from '../app-my-day/app-my-day';
import AddPage from '../app-add-page/app-add-page';
import MyDays from '../app-my-days/app-my-days';
import Statistic from '../app-statistic/app-statistic';
import Header from '../app-header-bar/app-header';
import React, {Component} from 'react';
import NextDay from '../app-my-next-day/app-my-day';
import MainGoals from '../main-goals-app/main-goals-app';

class App extends Component{

  constructor(props){
    super(props);

    // Внутреннее состояние приложения
    this.state={
      page: 'today', // Текущая страница
      data: (localStorage.getItem('data')!=null)?JSON.parse(localStorage.getItem('data')):[], // Подгрузка данных для приложения + проверка, если их нет
      date: '', // дата для переключения какой-то день  p.s. идёт в хедер
      visibleHead: true, // Отображение хэдера p.s. становиться false, когда человек заполняет форму для дня
      flagMainHide: false // Отображает страницу добавления целей

      }
    }
    // Внутреннее состояние приложения

    // Функция, для отображения хэдера
    onVisibleHead=()=>{
      this.setState({
        visibleHead: !this.state.visibleHead
      })
    }
    // Функция, для отображения хэдера

    // Функция, для обновления данных приложения p.s. данные == поставленные цели
    uploadDataState=(propData)=>{

      let poperty = propData;

      poperty = {
        date: poperty[1],
        goals: propData[0]
      }

      let array=[];

      this.state.data.forEach(item=>{
        array.push(item);
      })
    
      array.push(poperty);

      this.setState({
        data: array
      })

      localStorage.setItem('data',JSON.stringify(array));

    }
    // Функция, для обновления данных приложения p.s. данные == поставленные цели

    // Функция, меняющая страницу
    checkPage=(attue)=>{
      this.setState({page:attue});
    }
    // Функция, меняющая страницу

    // Функция добавления новой цели на день
    buttonAdd=(property)=>{

    // Функция, возвращающая время в мин
      function getMinuts(date){

        let hours = date.substr(0,2);

        let min = date.substr(3,5);

        return ((+hours[1]*60)+(+(hours[0]+'0')*60))+(+(min[0]+'0')+ +(min[1]))
      }
    // Функция, возвращающая время в мин

    // Сортировка целей
    let arr = property.goals;
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (getMinuts(arr[i].goal.substr(0,5)) > getMinuts(arr[i+1].goal.substr(0,5))) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    // Сортировка целей

    let newArr = this.state.data; // Данные до нажатия

    let index = ''; // Запоминает индекс дня, в котором произошло событие ADD

    // Поиск индекса дня, в котором добавляется ещё одна цель
    newArr.forEach((item,i)=>{
      if(item.date === property.date){
        index = i;
      }
    })
    // Поиск индекса дня, в котором добавляется ещё одна цель

    newArr = newArr.filter((item,i)=>i !== index); // Удаления старого дня(до добавления новой цели) из всех дней

    newArr.push(property); // Добавления дня после добавления новой цели

    // Обновление данных
    this.setState({
      data: newArr
    });

    localStorage.setItem('data',JSON.stringify(newArr));   
    // Обновление данных

   }
  // Функция добавления новой цели на день

  // Функция, обновляющая данные о завершении цели, её удаления, об удалении дня
  onComplite = (time, date, whoBut)=>{

    let copyArr = this.state.data; // данные до

      let copyDay = ''; // для поиска дня, в котором произошло событие

      let copyArray = this.state.data; //  Тот самый день

      let indexDay = '', // индекс дня, в котором произошло событие
          indexGoal = ''; // индекс цели, в которой произошло событие

      // нахождение дня
      copyArray = copyArray.filter((item,i)=>{
        if(item.date == date){
          indexDay = i;

          return item;
        }
      });
      // нахождение дня

      // Если была нажата кнопка "удалить цель"
      if(whoBut == 'rem'){

        let retData = this.state.data;

        retData.splice(indexDay,1);

        this.setState({
          data:retData
        })

        localStorage.setItem('data',JSON.stringify(retData));

      }
      // Если была нажата кнопка "удалить цель"

      copyDay = copyArray; // сохраняет день

      // Для нахождения цели
      copyArray = copyArray[0].goals.filter((item, i)=>{
        if(item.goal.substr(0,5) == time){
          indexGoal = i;
          return item;
        }
      });
       // Для нахождения цели

    // Если была нажата кнопка "Завершить цель"
    if(whoBut == 'ok'){
      copyArray[0].status = true;

      copyDay[0].goals[indexGoal] = copyArray[0];

      const allGoals = copyDay[0].goals.length;

      const okArray = copyDay[0].goals.filter(item=>item.status).length;

      if(allGoals === okArray){
        copyDay[0].flag = true;
      }

      copyArr[indexDay] = copyDay[0];
      
      this.setState({
        data: copyArr
      })

      localStorage.setItem('data',JSON.stringify(this.state.data));
     
      let mainGoals = JSON.parse(localStorage.getItem('mainGoals'));
  
      let array =mainGoals !== null?mainGoals.filter(item=>+item.id===+copyArray[0].branch)[0]:[];
      
      if(array !== undefined){

        if(array.length !== 0){
          
          array.count += 1;

          mainGoals.forEach((item, i)=>{
            if(+item.id === +copyArray[0].branch){
              mainGoals[i] = array;
            }
          })

          this.onChangeMainGoals(mainGoals)
    }
  }
  }
  // Если была нажата кнопка "Завершить цель"

  // Удаляет полностью день
    if(whoBut == 'del'){

     copyDay[0].goals.splice(indexGoal,1);

     if(copyDay[0].goals.length === 0){

       copyArr.splice(indexDay,1);

     }
     else{

      copyArr[indexDay] = copyDay[0];

     }

      this.setState({
        data: copyArr
      })

      localStorage.setItem('data',JSON.stringify(this.state.data));
    } 
  // Удаляет полностью день

  }
  // Функция, обновляющая данные о завершении цели, её удаления, об удалении дня

  // Обновляет самые главные цели
  onChangeMainGoals=(data)=>{
    localStorage.setItem('mainGoals',JSON.stringify(data));
  }
  // Обновляет самые главные цели

  // Позволяет открывать дни в общем разделе дней
  openPage=(data)=>{

    this.setState({
      date:data,
      page:'random'
    })

  }
  // Позволяет открывать дни в общем разделе дней

  // Меняет отображение страницы "добавление целей"
  onOffOrTurnMainComponent=()=>{
    this.setState({
      flagMainHide:!this.state.flagMainHide
    })
  }
  // Меняет отображение страницы "добавление целей"

  // Загружает текущую страницу
  onLoadPage=(page,flagMainHide)=>{
    if(page==='random'){
      return (
        <>
          {this.state.visibleHead?<Header name={this.state.date}/>:null}
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
           {this.state.visibleHead?<Header name="Today" onOffOrTurnMainComponent={this.onOffOrTurnMainComponent}/>:null}
           <MyDay checkPage={this.checkPage} 
           onComplite={this.onComplite} 
           data={this.state.data} 
           uploadDataState={this.uploadDataState}
           buttonAdd={this.buttonAdd}
           flag={false}
           onVisibleHead={this.onVisibleHead}
           flagMain={flagMainHide}
           />
        </>
      
      )
    }
    if(page==='statistics'){
      return (
        <>
         {this.state.visibleHead?<Header name="Statistics" onOffOrTurnMainComponent={this.onOffOrTurnMainComponent}/>:null}
          <Statistic checkPage={this.checkPage}
            flagMain={flagMainHide}
          />
        </>
      )
    }
    if(page==='nextDay'){
      return(
        <>
          {this.state.visibleHead?<Header name="Next day" onOffOrTurnMainComponent={this.onOffOrTurnMainComponent}/>:null}
          <NextDay checkPage={this.checkPage} 
          data={this.state.data} 
          uploadDataState={this.uploadDataState} 
          onComplite={this.onComplite}
          flag={false}
          buttonAdd={this.buttonAdd}
          onVisibleHead={this.onVisibleHead}
          flagMain={flagMainHide}
          />
      </>
      )
    }
    if(page==='myDays'){
      return(
        <>
        {this.state.visibleHead?<Header name="My days" onOffOrTurnMainComponent={this.onOffOrTurnMainComponent}/>:null}
        <MyDays checkPage={this.checkPage} 
        data={this.state.data} 
        uploadDataState={this.uploadDataState}
        openPage={this.openPage}
        onVisibleHead={this.onVisibleHead}
        flagMain={flagMainHide}
        />
       </>
      )
    }
  }
  // Загружает текущую страницу

  
  render(){
    return (
      <div className='globalApp'>
         {this.onLoadPage(this.state.page,this.state.flagMainHide)}
      
      </div>
  ); 
}

}




export default App;
