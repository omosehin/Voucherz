import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../../../../components/Grid/GridItem";
import GridContainer from "../../../../../components/Grid/GridContainer";
// import Card from "../../../../../components/Card/Card";
import CardHeader from "../../../../../components/Card/CardHeader";
 import CardBody from "../../../../../components/Card/CardBody";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
import CardFooter from "../../../../../components/Card/CardFooter";
import Store from "@material-ui/icons/Store";
import CardIcon from "../../../../../components/Card/CardIcon";
import Dashboard from "@material-ui/icons/Dashboard"
import GiftVoucherForm from "../GiftVoucher/GiftVoucherForm";
import ValueVoucherForm from "../ValueVoucher/ValueVoucherForm";
import DiscountVoucherForm from "../DiscountVoucher/DiscountVoucherForm";

const styles = theme => ({
  centerGridContent:{
           textAlign:'center',
       },
  VoucherDescription:{
      fontSize :"20px",
      margin:"0 auto"
    },
  flexContainer : {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    '&:hover': {
      color: 'none',
    },
  },
  Gridresponsive: {
    [theme.breakpoints.down('sm')]: {
        display:'flex',
        flexDirection:'column',
      }
  },
});

class Standalone extends Component {
    state = {
        expanded: null,       
      };
      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
      
      
     
    render(){
        const { classes } = this.props;
        const { expanded } = this.state;
        return(
<div>  
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary" style={{marginBottom:"20px"}}>
            <h1 style={{color:'white'}}>Create Single Voucher</h1>
          <p>Click to generate Voucher</p>
          </CardHeader>
         
          </GridItem>
          </GridContainer>

         
        <GridContainer>
          <GridItem xs={12} sm={12} lg={12}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary >
          <GridItem xs={12} sm={12} md={12} className={classes.centerGridContent}>
             
                  <CardHeader className={classes.centerGridContent}>
                      <CardIcon color="primary" style={{marginLeft:"20px"}}>
                      <Dashboard/>
                      </CardIcon>
           
                  </CardHeader>

                  <CardBody className={classes.centerGridContent}>
                      <h2>Gift Voucher</h2>
                      </CardBody>
                  <CardFooter className={classes.centerGridContent}>
                     <p className={classes.VoucherDescription}>A <b>pre-paid gift card</b>.Two types available:
                      <b>redeemable once</b> e.g pre-paid gift cards<br/>
                      <b>redeemable multiple times</b> against any of your product or service given a positive balance </p>
                  </CardFooter>
            
          </GridItem> 
          </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.Gridresponsive}>
         <GiftVoucherForm/>        
          </ExpansionPanelDetails>
          </ExpansionPanel>
          
          <ExpansionPanel expanded={expanded === 'panel2'}onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary >
          <GridItem xs={12} sm={12} md={12} className={classes.centerGridContent}>
         
                 <CardHeader className={classes.centerGridContent}>
                    <CardIcon color="primary" style={{marginLeft:"20px"}}>
                          <Dashboard/>
                    </CardIcon>
                </CardHeader>

                <CardBody className={classes.centerGridContent}>
                    <h2>Value Voucher</h2>
                </CardBody>
                <CardFooter className={classes.centerGridContent}>
                    <p className={classes.VoucherDescription}> Value Vouchers are <b>virtual PINs</b> that could be redeemed for other campaigns around Airtime, Paycode etc.</p>
                </CardFooter>
          
         </GridItem>
          </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.Gridresponsive}>
            <ValueVoucherForm/>
           
         </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary >
          <GridItem xs={12} sm={12} lg={12}>
          
            <CardHeader >
              
          <CardIcon color="primary" >
             <Store />
          </CardIcon>
             
             
            </CardHeader>
            <CardBody className={classes.centerGridContent}>
               <h2 >Discount Voucher </h2>
           </CardBody>
           <CardFooter className={classes.centerGridContent}>
               <p className={classes.VoucherDescription}>Discount coupon-represents one of 3 discount types: one of 3 <br/>
               discount types: <b>amount</b> (e.g N2000 off), <b>percentage</b> (e.g 30% off) or <b>unit</b> ( e.g 3 bags of rice)</p>
           </CardFooter>
         
          </GridItem>
          </ExpansionPanelSummary>
         <ExpansionPanelDetails className={classes.Gridresponsive}>
        <DiscountVoucherForm/>
         
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </GridItem>  
        
        </GridContainer>

       
       
    </div>
        );
    }
 
}

export default withStyles(styles)(Standalone);










