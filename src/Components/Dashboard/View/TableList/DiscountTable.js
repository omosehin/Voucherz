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
import Button from "@material-ui/core/Button";
import ViewsDetails from "../viewsDetails/Discount/index";
// import TableSearchVouchertype from './TableSearchVouchertype/FormSearchVouchertype';
import { CSVLink} from "react-csv";
import ClassesStyle from './TableSearch.module.css';
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
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
    searchStartdate: "",
    filterData: {}
  };
  this.download = this.download.bind(this)

}
 

  updateSearchVouchertype = e => {
    this.setState({ searchVouchertype: e.target.value.substr(0, 20) });
  };

  componentDidMount() {
    axios
      .get(" https://demo5882170.mockable.io", {
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

  /* Csv Download by React Csv*/
  ///////////////////////
  download(){
    this.filteredData = this.state.newUser.map(user => user);
    this.headers = [
      { label: "Merchant ID", key: "merchantid" },
      { label: "Merchant ID", key: "merchantid" },
      { label: "Voucher ID", key: "voucherType" },
      { label:  "StartDate", key:"startDate"},
      { label:  "ExpirationDate", key:"expirationDate"},
      { label: "Voucher Code", key: "Code"},
      { label:  "Status", key:"Status"},
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
    const { isLoading } = this.state;
    let i=1;
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
              className={ClassesStyle.input}
              type="text"
              maxlength="50"
              value={this.state.searchVouchertype}
              onChange={this.updateSearchVouchertype}
              placeholder={" Seach Voucher by Category" }
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
                  Code
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
                    {user.Code.length<10 ? user.Code:user.Code.substring(0,12)+'...'}
                  </TableCell>
                  <TableCell 
                   align="left" 
                    style={{ fontSize: "12px" }}>
                    {user.Status}
                  </TableCell>
                  <TableCell
                     align="left" 
                     style={{ fontSize: "12px"}}>

                    {user.amount}
                  </TableCell>
                  
                  
                  <TableCell align="left">
                    <ViewsDetails
                      voucherType={user.voucherType}
                      startDate={user.voucherType}
                      expirationDate={user.startDate}
                      status={user.status}                     
                      category={user.category}
                      additionInfo={user.additionInfo}
                      quantity={user.quantity}

                    />
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