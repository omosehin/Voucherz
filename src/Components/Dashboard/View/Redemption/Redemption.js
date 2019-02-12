import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import axios from "axios";


const styles =theme=> ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
});

class Redemption extends React.Component{
  state={
    newUser: [],
    filterData: {},
    searchValue: "",
    isLoading: true,


  }

  SearchCode = e => {
    this.setState({ searchValue: e.target.value.substr(0, 20) });
  };

  componentDidMount() {
    axios.get("http://192.168.43.101:8082/api/voucher/gift/search/code", {
        responseType: "json"
      })
      .then(response => {
        const newUser = response.data;
        this.setState({
          newUser,
          isLoading: false
        });
        console.log(response);
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  render(){
    const { classes } = this.props;
    const { isLoading } = this.state;

    let filteredvoucherType=this.state.newUser.filter(
      (user)=>{
        return user.category.toLowerCase().indexOf(
          this.state.searchByCode.toLowerCase() !==-1)
      }
    );
    return(
<div>
      <GridContainer justify = "center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Check the Status</p>
            </CardHeader>
            <CardBody>
              <GridContainer >
                 
                <GridItem xs={12} sm={12} md={13}>
                  <CustomInput
                  name="code"
                    labelText="Searxh Vachouz by Code"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                
              </GridContainer>
           
            </CardBody>
            <CardFooter>
              <Button color="primary">Search By Code</Button>
            </CardFooter>
          </Card>
        </GridItem>
       
      </GridContainer>
    </div>
    );
  }
} 

export default withStyles(styles)(Redemption);
