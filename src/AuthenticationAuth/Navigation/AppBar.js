import React from 'react';
//import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
//import background from './background.jpg';
// import { Route,Link} from 'react-router-dom';
//import SignInpage from '../Registration/SignInpage';
//import HomePage from '../HomePage/Hompage';
// import ForgotPasswordU from '../Registration/ForgotPasswordU';
//import SignUppage from '../Registration/SignUppage';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const styles = theme => ({

  appBar: {
    position: 'Fixed',
  },
  toolbarTitle: {
    flex: 1,
  },

  toolbar:{
    display: 'flex',
    alignItems:'center',
    padding:"20px",
  },
  NavLinkbutton:{
        display:'flex',
        alignItems:'center',
        padding:"0 1rem",
        
    
        // marginLeft: 'auto'
  },
  toolbarLogo:{
    color:'white',
    fontSize:'1.5rem',
  },
  spacer:{
    flex:1,
},
  
  card: {
    marginTop:100,
    maxWidth: 900,
  },
  media: {
    height: 220,
    paddingTop: '56.25%', // 16:9
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },


});



function Navigation(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="default" className={classes.appBar}>
        <Toolbar  className={classes.toolbar}>
        <div  className={classes.toolbarLogo}>
        <NavLink to={ROUTES.LANDING}>
            VOURCHERZ
        </NavLink>
        </div>  
        <div className={classes.spacer}/>
   
        <div className={classes.NavLinkbutton} >
        <div>
          <NavLink to={ROUTES.SIGN_UP}>
            <Button color="primary" variant="outlined" >
              Sign up
              </Button>
          </NavLink>
        </div>
        <div> 
          <NavLink to={ROUTES.SIGN_IN}>
            <Button color="primary" variant="outlined"  style={{marginLeft:'30px'}}>
            Sign In
            </Button> 
          </NavLink> 
          </div>
        </div>    
         
         
        </Toolbar>
      </AppBar>
      
   
    </React.Fragment>
  );
}

export default withStyles(styles)(Navigation);