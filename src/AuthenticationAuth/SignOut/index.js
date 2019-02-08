import React from 'react';
import {Redirect} from 'react-router-dom';



export default class SignOutButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
           redirectToReferrer:false,
            
        }
        this.logout = this.logout.bind(this);
      
      
      }

  



    logout(){
        sessionStorage.setItem("data",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
    }

    render(){

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'}/>)
          }

      return(
                <div>
                <button style={{backgroundColor:'#972FB0'}} type="button" onClick={this.logout} className="btn btn-primary">Log Out</button>
                </div>
            )
    }
        
}