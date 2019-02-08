import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';
//import { compose } from 'recompose';
//import { SignUpLink } from '../SignUp';
//import { PasswordForgetLink } from '../PasswordForget';
// import { withFirebase } from '../Firebase';
//import * as ROUTES from '../../constants/routes';
//import { withFirebase } from '../Firebase';

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
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const { classes } = this.props;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  ChangePassword
                </Typography>
      <form onSubmit={this.onSubmit}  className={classes.form}>
      <FormControl 
                  margin="normal" 
                  required fullWidth>
                    <InputLabel 
                    htmlFor="passwordOne">New Password</InputLabel>
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
           id="password" 
          autoComplete="current-password"
        />
        </FormControl>
        <FormControl 
                  margin="normal" 
                  required fullWidth>
                    <InputLabel 
                    htmlFor="passwordTwo">Comfirm Password</InputLabel>
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
          id="password" 
          autoComplete="current-password"
        />
        </FormControl>
        <Button
        
           fullWidth
           variant="contained"
           color="primary"
           className={classes.submit}
        disabled={isInvalid} 
        type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Paper>
            </main>
    );
  }
}
PasswordChangeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((PasswordChangeForm));