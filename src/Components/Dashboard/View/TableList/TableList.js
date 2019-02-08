import React,{ Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import ValueTable from "./ValueTable"
import DiscountTable from "./DiscountTable"
import GiftTable from "./GiftTable.js";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

const styles =(theme)=> ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: 20,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: 20,
    color: theme.palette.text.secondary,
  },
  
}); 



class TableList extends Component{
  state = {
    expanded: null,
  };

  getRecipe=(e)=>{
    const recipeName=e.target.elememts.recipeName.value;

    e.preventDefault();
    console.log(recipeName)
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  render(){
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div >
         <GridContainer>
          <GridItem xs={12} sm={12} lg={12}>
            <CustomTabs
              title="CLICK VOUCHER:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Value Voucher Table",
                  tabIcon: BugReport,
                  tabContent: (
                    <ValueTable/>
                  )
                },
                {
                  tabName: "Gift Voucher Table",
                  tabIcon: Code,
                  tabContent: (
                    <GiftTable/> 
                  )
                },
                {
                  tabName: "Discount Voucher Table",
                  tabIcon: Cloud,
                  tabContent: (
                    <DiscountTable/>
                  )
                }
              ]}
            />
          </GridItem>
          </GridContainer>
     
      
     
      </div>

    );

  }
}

export default withStyles(styles)(TableList);
