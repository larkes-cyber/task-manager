import './add-main-goal-form.css';
import addImg from '../app-goal-value/img/images/addImgpng.png';
import openImg from '../app-goal-value/img/images/open.png';
import exampleImg from '../app-goal-value/img/images/star.png';
import cancel from '../app-goal-value/img/cancel.png';
import { useState } from 'react';
import object from '../service/service';

const AddMainGoalForm = (props) => {

    const [changeToImages, setChangeToImages] = useState(false);
    const [nowImg,setNowImg] = useState(addImg)

    const addToMemory = (allData, id, goal, imgId = 1) => {

        const newGoal = {
            "id":id,
            "goal":goal,
            "count":0,
            "idImg":imgId
        }

       const newDataOfMainGoals = [...allData, newGoal]




       localStorage.setItem('mainGoals',JSON.stringify(newDataOfMainGoals));

       return newDataOfMainGoals;

    }


    const addMainGoal = () => {

        const data = (localStorage.getItem('mainGoals')!=null)?JSON.parse(localStorage.getItem('mainGoals')):[],
              goal = document.querySelector('.inputForAddMainGoal').value;

        let lastId = -1;
        

        console.log(data)

        if(data.length !== 0){

            lastId = data[data.length-1].id;


        }


        if(goal.length === 0) {
            props.setOnShowForm(null);
            return
        }


        const selectedIcon = document.querySelector('.addImgForAddMainGoal').getAttribute('src')

        props.setOnShowForm(addToMemory(data, lastId+1, goal, selectedIcon));

    }


    const clickOnIcon = (e) => {

        e.currentTarget.parentNode.childNodes.forEach(element => {
            element.style.border = '1px solid #E8E8E8';
            element.className = 'blockImgFromImages';
        });

        e.currentTarget.style.border = "1px solid #55FF99";
        e.currentTarget.className = 'blockImgFromImages selected';


        console.log(e.currentTarget.getAttribute('id'))

    }


    const selectedIcon = () => {


        document.querySelector('.forImagesFromImg').childNodes.forEach(item => {
            if(item.classList.contains('selected')){
                setNowImg(item.getAttribute('forSelect'))
            }
        })

        setChangeToImages(false);

    }

    const arrayOfIcons = ()=> {
        
        let ArrayOfIcons = [];

        for(let n in object){
            ArrayOfIcons.push((
                <div className='blockImgFromImages' id = {n} forSelect = {object[n]} onClick={clickOnIcon} >
                    <img src={object[n]} className="imgFromImages"  alt="" />
                </div>
            ))
        }

        return ArrayOfIcons;

    }

    return (
        
       

        <div className="b-popup ">
     
            <div className="content-for-add-main-goal">
            <img src={cancel} className="cancelForMain" onClick = {() => props.setOnShowForm(null)} alt="" />
                <h1 className='titleForAddMainGoal'>Your main goal:</h1>
                <div className='contentWithImgAndForm'>
                    <div className='imagesForAddMainGoal'>
                         <img src={nowImg} className={!changeToImages ? "addImgForAddMainGoal" : "addImgForAddMainGoal hideForImg"} alt="" onClick={() => setChangeToImages(true)} />
                         <div className={changeToImages ? "expamplesOfImages" : "expamplesOfImages hideForImg"}>
                             <img src={openImg} className="openImgForAddMainGoal" onClick={selectedIcon} alt="" />
                             <div className='forImagesFromImg' >
                                {arrayOfIcons()}
                             </div>
                           
                         </div>
                         
                    </div>
                    
                    <input type="text" className='inputForAddMainGoal' />
                </div>
                <button className='buttonForAddMainGoal' onClick = {addMainGoal}>add</button>
             </div>
        </div>
    )

}

export default AddMainGoalForm;