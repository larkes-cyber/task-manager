import './add-main-goal-form.css';
import addImg from '../app-goal-value/img/images/addImgpng.png';
import openImg from '../app-goal-value/img/images/open.png';
import exampleImg from '../app-goal-value/img/images/star.png';
import { useState } from 'react';
import object from '../service/service';

const AddMainGoalForm = () => {

    const [changeToImages, setChangeToImages] = useState(false);
    const [nowImg,setNowImg] = useState(0)





    const clickOnIcon = (e) => {

        e.currentTarget.parentNode.childNodes.forEach(element => {
            element.style.border = '1px solid #E8E8E8';
        });

        e.currentTarget.style.border = "1px solid #55FF99";
        console.log()
    }

//`expamplesOfImages`

    return (
        
        <div class="b-popup ">
            <div class="content-for-add-main-goal">
                <h1 className='titleForAddMainGoal'>Your main goal:</h1>
                <div className='contentWithImgAndForm'>
                    <div className='imagesForAddMainGoal'>
                         <img src={addImg} className={!changeToImages ? "addImgForAddMainGoal" : "addImgForAddMainGoal hideForImg"} alt="" onClick={() => setChangeToImages(true)} />
                         <div className={changeToImages ? "expamplesOfImages" : "expamplesOfImages hideForImg"}>
                             <img src={openImg} className="openImgForAddMainGoal" onClick={() => setChangeToImages(false)} alt="" />
                             <div className='forImagesFromImg' >
                                <div className='blockImgFromImages' id = {1} onClick={clickOnIcon} >
                                    <img src={object[1]} className="imgFromImages" alt="" />
                                </div>
                                <div className='blockImgFromImages' id = {2} onClick={clickOnIcon}>
                                    <img src={exampleImg} className="imgFromImages" alt="" />
                                </div>
                                <div className='blockImgFromImages' id = {3} onClick={clickOnIcon}>
                                    <img src={exampleImg} className="imgFromImages" alt="" />
                                </div>
                                <div className='blockImgFromImages' id = {4} onClick={clickOnIcon}>
                                    <img src={exampleImg} className="imgFromImages" alt="" />
                                </div>
                                <div className='blockImgFromImages' id = {5} onClick={clickOnIcon}>
                                    <img src={exampleImg} className="imgFromImages" alt="" />
                                </div>
                                <div className='blockImgFromImages' id = {6} onClick={clickOnIcon}>
                                    <img src={exampleImg} className="imgFromImages" alt="" />
                                </div>
                             </div>
                           
                         </div>
                         
                    </div>
                    
                    <input type="text" className='inputForAddMainGoal' />
                </div>
                
                <button className='buttonForAddMainGoal'>add</button>
             </div>
        </div>
    )

}

export default AddMainGoalForm;