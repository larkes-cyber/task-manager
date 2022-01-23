import './app-add-page.css';
import React, {Component } from 'react';
import AppNav from '../app-nav-bar/app-nav-bar';
import AddButForm from '../app-add-button/app-add-button';
import AddDayForm from '../app-add-day-form/app-add-day-form';
import Plns from '../app-goal-value/img/plans.png';
class AddPage extends Component{
    constructor(props){
        super(props);
        this.state={
            addForm:false
        }
    }
    onChangeFlag=()=>{
        this.setState({
            addForm:!this.state.addForm
        });
    }
    onChangeStateAddForm=(data)=>{
        this.setState({
            addForm:!this.state.addForm
        });
        this.props.uploadDataState(data);
    }
    onHideForm=()=>{
        this.setState({
            addForm:false
        })
    }
    loadAddForm=(flag)=>{
        if(flag){
            document.querySelector('body').style.paddingBottom='-2%';
            return(
                <div>
                <AddDayForm onComplite={this.state.onComplite} onVisibleHead={()=>this.props.onVisibleHead()} onHideForm={this.onHideForm} changeState={this.onChangeStateAddForm} day={this.props.day}/>
                    <div className="appMain formAlert">
                        <AppNav checkAttue={(e)=>{this.props.checkPage(this.onAttue(e))}}/>
                        <AddButForm changeState={this.onChangeFlag}/>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="appMain">
                        <AppNav checkAttue={(e)=>{this.props.checkPage(this.onAttue(e))}}/>
                        <div className='fixNavAdd'>
                            <div className='together'>
                                <img src={Plns} className='plns' alt="" />
                                <h1 className='unPln'>No plans for this day</h1>
                                <AddButForm onVisibleHead={()=>this.props.onVisibleHead()} changeState={this.onChangeFlag}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    onAttue=(e)=>{
        return e.target.getAttribute('data-page');
    }
    render(){
    return(
        <>
               {this.loadAddForm(this.state.addForm)}
        </>
     
    )
    }
}
export default AddPage;