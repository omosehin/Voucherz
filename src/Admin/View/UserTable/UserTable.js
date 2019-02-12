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

import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import {Redirect} from 'react-router-dom';
// import UpdateValue from '../Vourcher/UpdateVoucher/UpdateValue';

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
state = {  
 
    disabled:false,
    open: false,
    redirect:false,
    newUser: [],
    isLoading: true,
    error: null,
    filterData: {}
  };


 


  updateSearchVouchertype = e => {
    this.setState({ searchVouchertype: e.target.value.substr(0, 20) });
  };
   componentDidMount() {

     if(sessionStorage.getItem('admin'))
       {
      let token = sessionStorage.getItem('admin');
      
       console.log(token);
    axios.get("http://38952061.ngrok.io/user/users", { headers: {"Authorization" : `Bearer ${token}`} })
      .then(response => {
        const newUser = response.data;
        console.log(newUser)
        this.setState({
          newUser,
          isLoading: false
        });
        console.log(response);
      })
      .catch(error =>
        this.setState({
          error,
        })
      );
  }
}  


  

  render() {
    const { classes } = this.props;
    const { isLoading, newUser } = this.state;
let i=1;
    console.log("users", newUser);
   
    
    return (
 <div>
       
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
                 FirstName
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                LastName
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                 Email 
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "purple", fontSize: "15px" }}
                >
                  Role
                </TableCell>
               
              </TableRow>
            </TableHead>

            <TableBody>
              {newUser.map(user => (
                <TableRow key={user.id}>
                  <TableCell style={{ fontSize: "12px" }}>
                    {i++}
                  </TableCell>
                  <TableCell 
                    align="left" 
                    style={{ fontSize: "12px" }}>
                     {user.firstName}
                  </TableCell>
                  
                  <TableCell 
                    align="left" 
                    style={{ fontSize: "12px" }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell 
                    align="left"  
                    style={{fontSize:'12px'}}>
                    {user.email}
                  </TableCell>
                  
                  <TableCell 
                    align="left"  
                    style={{fontSize:'12px'}}>
                    {user.role}
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