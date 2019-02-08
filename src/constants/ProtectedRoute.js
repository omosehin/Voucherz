import React from 'react';
import {Route,Redirect} from 'react-router-dom';

  const ProtectedDashboard = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
          sessionStorage.getItem("data") ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: {from: props.location} }}/>
          )
          )}/>
    );
  }

 

export default ProtectedDashboard;