import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter,Redirect} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose';
import AppBar from '../Navigation/AppBar';
import axios from 'axios'
import {RemoveRedEye} from '@material-ui/icons';

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
  SignUpPage:{
    textAlign:'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SignUpPage = () => (
  <div className={styles.SignUpPage}>
  <AppBar/>
    <h1 style={{textAlign:'center'}}>SignUp</h1>
     <SignUpForm/>
  </div>
);

// const INITIAL_STATE = {
//   firstName:'',
//   lastName:'',
//   email: '',
//   password: '',
//   companySize:"",
//   error: null,
// };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      comfirm_password:'',
      companySize:'',
      isLoggingIn: false,
        error:'',
        passwordIsMasked:true,

        
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

  }


  onSubmit = (e) => {
    e.preventDefault();
                document.getElementById("buttonShipper").innerHTML = "signing you up...";
    // get our form data out of state
    var apiBaseUrl = 'http://172.20.20.21:8072/user/signup';

    const { firstName, lastName, email,companySize, password} = this.state;
    
    let data = {
        firstName,
        lastName,
        email,
        password,
        companySize,
        
       
    }

    console.log(JSON.stringify(data));
    
    
    axios.post(apiBaseUrl, data, {
        data: JSON.stringify(data),
        
    }).then((response) => {

        
        console.log(response);
       
            alert("Created");
           
             document.getElementById("buttonShipper").innerHTML = "success";
             this.props.history.push(ROUTES.SIGN_IN)

            
        
    })
    .catch=((error)=> {
        alert("failed to complete");
        document.getElementById("buttonShipper").innerHTML = "failed try again...";
        console.log('error got' + error);
    });   
}


  render() {
     const {
      firstName,
      lastName,
      email,
      password,
      comfirm_password,
      companySize,
      error,
     } = this.state;
    const { classes } = this.props;


     const isInvalid =
       password !== comfirm_password ||
       password === '' ||
       firstName === '' ||
       email=== '' ||
       lastName === ''||
       companySize ==='';
       
    return (
      
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      <form onSubmit={this.onSubmit} className={classes.form}>
      <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="firstName">First Name</InputLabel>

         <Input
         id="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
          type="text"
          placeholder="First Name"
          autoComplete="text"
          autoFocus
          
        />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="secondname">Last Name</InputLabel>
        <Input
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
          type="text"
          placeholder="minimum of 3 and 20"
          autoComplete="text"
          autoFocus

        />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
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
            placeholder="Password"
            autoComplete="current-password" 
            id="password"
            type='password'
           
          />
          </FormControl>

          <FormControl 
              margin="normal" 
             required fullWidth>
                <InputLabel 
                htmlFor="comfirm_password">Comfirm Password</InputLabel>
          <Input
            name="comfirm_password"
            value={this.state.comfirm_password}
            onChange={this.onChange}
             type="password"
            placeholder="Comfirm Passsword"
            autoComplete="current-password" 
            id="password"
          />
          </FormControl>
         
  
          <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="companySize">Company Size</InputLabel>
          <Input
            name="companySize"
            value={this.state.companySize}
            onChange={this.onChange}
            type="number"
            placeholder="Company Size"
            autoComplete="number"
            autoFocus
  
          />
          </FormControl>
          
         
         
          <Button 
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           id="buttonShipper"
           disabled={isInvalid}
          >
            Sign Up
          </Button>
  
        
        </form>
        </Paper>
        </main>
      );
    }
  }
  
  const SignUpLink = () => (
    <p style={{textAlign:'center'}}>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
  const SignUpForm = compose(
    withRouter,
    withStyles(styles)
  )(SignUpFormBase);
  
    SignUpForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default (SignUpPage);
  export { SignUpForm, SignUpLink };
  