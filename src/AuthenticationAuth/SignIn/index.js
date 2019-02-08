import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link, withRouter , Redirect} from 'react-router-dom';
import axios from 'axios';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import AppBar from '../Navigation/AppBar'
import NotFound from '../Error/NotFound';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SignInPage = () => (
  <div>
   <AppBar/>

    <h1 style={{textAlign:'center'}}>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

// const INITIAL_STATE = {
//   email: '',
//   password: '',
//   error: null,
// };

 class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser:{
        email:"",
        password:'',
      } ,
      isWrong:false,
      isLoading: true,

   
    };

     
  }
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state Voucher (destructuring)
    const state = this.state.newUser
    state[e.target.name] = e.target.value;
    this.setState(state);
}

onSubmit = (e) => {
  e.preventDefault();
              document.getElementById("buttonShipper").innerHTML = "signing you in...";
  // get our form data out of state
  var apiBaseUrl = 'http://172.20.20.21:8072/user/signin';

  const {  email, password  } = this.state.newUser;
  
  let data = {
      email,
      password,  
  }

  console.log(JSON.stringify(data));
  axios.post(apiBaseUrl, data, {
      data: JSON.stringify(data),
           
  })

  .then((response) => {
    if(response.data && response.data.accessToken){
      sessionStorage.setItem('data',response.data.accessToken);
      this.setState({redirectToReferrer: true});
     
    }
    
    
})
.catch(function (error) {
  if(error.code === "404"){
    this.setState({isLoading: true})
  }
    document.getElementById("buttonShipper").innerHTML = "failed try again2...";
    setTimeout(document.getElementById("buttonShipper").innerHTML="signin", 2000)
    alert( error + "failed to complete");
    console.log(error);

});   
}


render() {

  if (this.state.redirectToReferrer){
      
    return (<Redirect to={'/dashboard'}/>)
    }
    if (sessionStorage.getItem('data')){
    
        return (<Redirect to={'/dashboard'}/>)
    }
  
  const { classes } = this.props;


  return (
    
    <main className={classes.main}>
      <CssBaseline />

      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
         {this.state.isWrong? <NotFound/>:null} 
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            </FormControl>
            <FormControl 
            margin="normal" 
            required fullWidth>
            <InputLabel 
            htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="current-password"/>
              </FormControl>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me" />
                    
              <Button 
              fullWidth
              variant="contained"
              color="primary"
              id="buttonShipper"
              className={classes.submit} 
              type="submit">
                Sign In
              </Button>

              
          </form>
        </Paper>
      </main>
    );
  }
}


const SignInForm = compose(
  withRouter,
  withStyles(styles)
)(SignInFormBase);

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(SignInPage);
export {SignInForm}
