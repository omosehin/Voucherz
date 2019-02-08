import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
//import { compose } from 'recompose';
//import { SignUpLink } from '../SignUp';
// import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import axios from 'axios'
import AppBar from '../Navigation/AppBar'




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
const PasswordForgetPage = () => (
  <div className={styles.PasswordForget}>
  <AppBar/>
    <h1 style={{textAlign:'center'}}>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    document.getElementById("buttonShipper").innerHTML = "Reseting Password...";
    var apiBaseUrl = 'http://172.20.20.21:8085/password-reset/forgot';

    const { email } = this.state;
    let data={
      email
    }
    console.log(JSON.stringify(data));
    axios.post(apiBaseUrl, data, {
      data: JSON.stringify(data),
      
  })
  .then((response) => {
      console.log(response);
      //  if(response.data.result){
          // alert(response.data.result.message);
          alert("Check Email for Password reset");
         
           document.getElementById("buttonShipper").innerHTML = "success";
           this.props.history.push(ROUTES.CHANGE_PASSWORD)
  })
  .catch=((error)=> {
      alert("failed to complete");
      document.getElementById("buttonShipper").innerHTML = "failed try again...";
      console.log('error got' + error);
     
  });  

  }
  
    
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
      <form className={classes.form} onSubmit={this.onSubmit}>
      <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          autoComplete="email"
          autoFocus
        />
                      </FormControl>

        <Button 
          fullWidth
              variant="contained"
              // disabled={isInvalid}
              color="primary"
              className={classes.submit}
              id="buttonShipper"

          type="submit">
          Reset My Password
        </Button>

        {/* {error && <p>{error.message}</p>} */}
      </form>
      </Paper>
      </main>

    );
  }
}

const PasswordForgetLink = () => (
<p style={{textAlign:'center'}}>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
</p>
);
PasswordForgetFormBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const PasswordForgetForm=compose(
  withRouter,
  withStyles(styles)
)(PasswordForgetFormBase);

export default PasswordForgetPage;


export { PasswordForgetForm, PasswordForgetLink };
