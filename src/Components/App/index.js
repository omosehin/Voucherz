import React, {Component} from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
  import SignUpPage from '../../AuthenticationAuth/SignUp';
  import SignInPage from '../../AuthenticationAuth/SignIn';
 import HomePage from '../../AuthenticationAuth/HomePage/Hompage';
 import * as ROUTES from '../../constants/routes';
import Dashboard from '../../Components/Dashboard/Layout/Dashboard/Dashboard';
import PasswordForgetPage from '../../AuthenticationAuth/PasswordForget';
import ChangePasswordPage from '../../AuthenticationAuth/PasswordChange';
import NotFound from '../../AuthenticationAuth/Error/NotFound'
  import ProtectedRoute from '../../constants/ProtectedRoute'

class App extends Component{

  render(){
   
    return(
<Router>
    <div>
     <Route exact path={ROUTES.LANDING} component={HomePage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} /> 
      <Route exact path={ROUTES.CHANGE_PASSWORD} component={ChangePasswordPage} /> 
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/> 
      <ProtectedRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <ProtectedRoute exact path={ROUTES.VOUCHER} component={Dashboard} />
      <ProtectedRoute exact path={ROUTES.TABLE} component={Dashboard} />
      <ProtectedRoute exact path={ROUTES.BULK} component={Dashboard} />
      <ProtectedRoute exact path={ROUTES.STANDALONE} component={Dashboard} />

      <Route path={ROUTES.NOTFOUND} component={NotFound} /> 
    </div>
  </Router>
    );
    }
  }

export default App;