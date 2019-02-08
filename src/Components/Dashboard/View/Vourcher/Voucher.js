import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";

import red from '@material-ui/core/colors/red';
import Export from '@material-ui/icons/CloudUpload';

import IconButton from '@material-ui/core/IconButton';
// import CreateSingleVoucherDashboard from './CreateVoucher/CreateSingleVoucherDashboard/CreateSingleVoucherDashboard';
// import CreateBulkVoucherDashboard from './CreateVoucher/CreateBulkVoucherDashboard/CreateBulkVoucherDashboard';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Route,Link} from 'react-router-dom';
// import CreateVoucher from "./CreateVoucher/CreateBulkVoucherDashboard/CreateBulkVoucherDashboard";

import Store from "@material-ui/icons/Store";
import CardIcon from "../../components/Card/CardIcon";
// import Icons from "../View/views/Icons/Icons";
import Dashboard from "@material-ui/icons/Dashboard"
import ButtonBase from '@material-ui/core/ButtonBase';
// import DiscountVoucherForm from "./CreateVoucher/DiscountVoucher/DiscountVoucherForm";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    display: 'flex',
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  
  },
 
  icon: {
    margin: 5,
  },
  iconHover: {
    margin: 5,
    '&:hover': {
      color: red[800],
    },
  },
  flexContainer : {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    '&:hover': {
      color: 'none',
    },
  },

};


 

class UserProfile extends Component {
  state={
    anchorEl: null,
    mobileMoreAnchorEl: null,
    expanded: null,
  }

  handleChangeExpanded = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  

  redirecttoBulkVoucherDashboard=(e)=>{
    this.props.history.push("/Bulk")
  }

  CreateSingleVoucherDashboard=(e)=>{
    this.props.history.push("/Standalone")

  }
  render(){
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                 <CardHeader color="primary">
                      <p style={{float:"left",marginTop:"12px"}}>GENERATE VOUCHER</p>

                      <div className={classes.cardTitleWhite}>
                          
                          <IconButton color="inherit">
                              <Export />
                          </IconButton>
                          <IconButton>
                        </IconButton>
            
                    </div>
                  </CardHeader>

            </GridItem>
            </GridContainer>
            <GridContainer>

            <GridItem xs={12} sm={12} md={6} >
                <Card>
                <ButtonBase
                 className={classes.cardAction}
          onClick={this.redirecttoBulkVoucherDashboard}
      >

                    <CardHeader >
                    
                      <CardIcon color="primary" >
                        <Store />
                    </CardIcon>
                  </CardHeader>
                    <CardBody className={classes.centerGridContent}>
                      <h2 >Bulk Codes</h2>
                    </CardBody>
                    <CardFooter className={classes.centerGridContent}>
                        <p>Generate a pool of unique and hard-to-guess codes.
                          Customise size, 
                          prefix, expiry date and redemptions limit.</p>
                    </CardFooter>
                    </ButtonBase>
                </Card>
               

              </GridItem>

              <GridItem xs={12} sm={12} md={6} className={classes.centerGridContent}>
              
                  <Card>
                  <ButtonBase
                 className={classes.cardAction}
          onClick={this.CreateSingleVoucherDashboard}
      >
                      <CardHeader className={classes.centerGridContent}>
                        <CardIcon color="primary" style={{marginLeft:"20px"}}>
                          <Dashboard/>
                        </CardIcon>         
                    </CardHeader>
                    
                    <CardBody className={classes.centerGridContent}>
                      <h2>Standalone</h2>
                    </CardBody>
                    <CardFooter className={classes.centerGridContent}>
                      <p>Define or generate a fixed code (e.g. voucherify4free) for multiple use.
                            Assign tags with custom categories for further maintenance and reporting.</p>
                    </CardFooter>
                    </ButtonBase>
                  </Card>
            </GridItem>
            
          

        {/* <Route path="/voucher/Bulk" component={CreateBulkVoucherDashboard}/> */}
        {/* <Route path="/voucher/Standalone" component={CreateSingleVoucherDashboard}/> */}
          
            </GridContainer>
            
       
      </div>
      );
  }
 
 
}

export default withStyles(styles)(UserProfile);
