import React, {Component } from 'react';
import './app-add-button.css';
import addIcon from '../app-goal-value/img/addBut.png';
class AddButForm extends Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    onVisibleHeadClick=()=>{
        this.props.onVisibleHead();
        this.props.changeState();
    }

    render(){
        return(
            <div>
                <div className="but" onClick={this.onVisibleHeadClick}>
                    <img src={addIcon} className="png" alt=""/>
                    <h1 className="textBut">Add</h1> 
                </div>
            </div>
        )
    }
}
export default AddButForm;
