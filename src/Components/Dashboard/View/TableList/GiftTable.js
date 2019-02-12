import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { CSVLink} from "react-csv";
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import UpdateGift from '../Vourcher/UpdateVoucher/UpdateGift';
import ViewsDetails from "../viewsDetails/GiftDetails/index";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  input:{
    width:'100%',
    height:"40px",
    marginBottom:"20px"
  }
});
const csvStyle  = {
  fontSize: 16,
  fontWeight: 500,
  height: 52,
  padding: '10px',
  borderRadius: 5,
  color: '#972FB0',
  marginTop:"-10px",
 border:'1px solid #972FB0'
};


class StandalonTable extends Component {

constructor(){
super()
   this.state = {
    newUser: [],
    isLoading: true,
    error: null,
    searchVouchertype: "",
    searchValue: "",
    filterData: {}
  };
  this.download = this.download.bind(this)

}
 
updateSearchVouchertype = e => {
  this.setState({ searchVouchertype: e.target.value.substr(0, 20) });
};
  componentDidMount() {
    
    axios.get("https://172.20.20.17:8082/api/voucher/gift/search/findByGiftType/gift")
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


  /* Csv Download by React Csv*/
  ///////////////////////
  download(){
    this.filteredData = this.state.newUser.map(user => user);
    this.headers = [
      { label: "Merchant ID", key: "merchantid" },
      { label: "Voucher ID", key: "voucherType" },
      { label:  "StartDate", key:"startDate"},
      { label:  "ExpirationDate", key:"expirationDate"},
      { label: "Voucher code", key: "code"},
      { label:  "Status", key:"status"},
      { label:  "Category", key:"category"},


    ];

     return (<span><CSVLink 
      data={this.filteredData} style={csvStyle}>
      Export CSV
      </CSVLink>
      </span>);
  }
  //////////////////////////////////

  render() {
    const { classes } = this.props;
    const { isLoading,newUser } = this.state;
    let i=1;
    console.log("users", newUser);

    let filteredvoucherType=this.state.newUser.filter(
      (user)=>{
        return user.category.toLowerCase().indexOf(
          this.state.searchVouchertype.toLowerCase()) !==-1;
      }
    );
    
    return (
 <div>
       <GridContainer justify = "center">
          <GridItem xs={6} sm={6} md={6} >
          <input
              className={classes.input}
              type="text"
              maxlength="50"
              value={this.state.searchVouchertype}
              onChange={this.updateSearchVouchertype}
              placeholder={" SEARCH BY CATEGORY" }
          />
          </GridItem>
          
          <GridItem xs={6} sm={6} md={4}> {this.download()} </GridItem>

        </GridContainer>
      <Paper className={classes.root}>
    

        {!isLoading ? (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "purple", fontSize: "15px" }}>
                  No
                </TableCell>
                
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                 Category
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                Start Date
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                 ExpirationDate 
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  code
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  Status
                </TableCell>
                 <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  Amount
                </TableCell>  
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  View
                </TableCell> 
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  Update
                </TableCell> 
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredvoucherType.map(user => (
                <TableRow key={user.merchantId}>
                  <TableCell style={{ fontSize: "12px" }}>
                    {i++}
                  </TableCell>
                  <TableCell 
                    align="left" 
                    style={{ fontSize: "12px" }}>
                     {user.category}
                  </TableCell>
                  
                  <TableCell 
                    align="left" 
                    style={{ fontSize: "12px" }}>
                    {user.startDate}
                  </TableCell>
                  <TableCell 
                    align="left"  
                    style={{fontSize:'12px'}}>
                    {user.expirationDate.length<5 ? user.expirationDate:user.expirationDate.substring(0,6)+'...'}
                  </TableCell>
                  
                  <TableCell 
                    align="left"  
                    style={{fontSize:'12px'}}>
                    {user.code.length<10 ? user.code:user.code.substring(0,12)+'...'}
                  </TableCell>
                  <TableCell 
                   align="left" 
                    style={{ fontSize: "12px" }}>
                    {user.status}
                  </TableCell>
                  <TableCell
                     align="left" 
                     style={{ fontSize: "12px"}}>

                    {user.amount}
                  </TableCell>
                  
                  
                  <TableCell align="left">
                    <ViewsDetails
                     code={user.code}
                      voucherType={user.voucherType}
                      startDate={user.startDate}
                      expirationDate={user.expirationDate}
                      status={user.status}                     
                      category={user.category}
                      amount={user.amount}
                      additionInfo={user.additionInfo}
                      
                    />
                  </TableCell>
                  <TableCell>
                    <UpdateGift
                     align="left" 
                     style={{ fontSize: "12px"}}                     
                     fields={user}/>

                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Spinner />
        )}
      </Paper>
      </div>
    );
  }
}


export default withStyles(styles)(StandalonTable);