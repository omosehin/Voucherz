import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from "../../../components/Forms/Input"
import Grid from '@material-ui/core/Grid';
import TextArea from "../../../components/Forms/TextArea"
import axios from "axios";
import {Redirect} from 'react-router-dom';


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
    menu: {
      width: 400,
    },
    textField: {
      // marginLeft: theme.spacing.unit,
      // marginRight: theme.spacing.unit,
      width:'100%',
    },
    icon: {
      margin: 5,
    },
    form: {
     width: '50%', // Fix IE 11 issue.
    },
  
  };
  const buttonStyle = {
    backgroundColor:"#972FAF",
    color:"white",
    width: '81px',
    height: '33px',
    color: 'white',
   };
class FormDialog extends React.Component {
  state = {
    newUser:{
        value:"",        
        category:"",
        startDate:"",
        expirationDate:"",
        additionInfo:"",
      },
      disabled:false,
      open: false,
      redirect:false,


  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleDisable=()=>{
    this.setState((prevState)=>{
      return(
        ({disabled:!prevState.disabled})
      );
    })
  }
  


VoucherhandleInput=(e) =>{
  let value = e.target.value;
  let name = e.target.name;
  const re = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
  if (e.target.value === "" || re.test(e.target.value)){
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
    );
  }
}
  
  VoucherDateCharsethandleInput=(e) =>{
    let value = e.target.value;
    let name = e.target.name;
    
      this.setState(
        prevState => ({
          newUser: {
            ...prevState.newUser,
            [name]: value
          }
        }),
      );
    }
    


handleTextArea=(e)=>{
  console.log("Inside handleTextArea");
  let value = e.target.value;
  this.setState(
    prevState => ({
      newUser: {
        ...prevState.newUser,
        additionInfo: value
      }
    }),
  );
}


handleFormSubmit=(e)=>{
    e.preventDefault();
    const{ value, category,startDate, expirationDate,additionInfo} = this.state.newUser;


    let userData={value, category,startDate, expirationDate,additionInfo

    } 
    console.log(userData);
    const voucherData = JSON.stringify(userData)
    console.log(voucherData);
    let token = sessionStorage.getItem('data');

   const headers = {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`

   }
   axios.put(`http://172.20.20.17:8082/api/voucher/update/value/`,voucherData, {"headers": headers})
   .then(res => {
     alert( 'Successfully created with code ');
     console.log("Succesfully Generated")
     this.setState({
        newUser:{
            value:"",        
            category:"",
            startDate:"",
            expirationDate:"",
            additionInfo:"",
          },
      redirect: true,
      open: false
    })
   })
   .catch((error) => {
     alert( error + " Voucher Update Failed ")
     this.setState({
        newUser:{
            value:"",        
            category:"",
            startDate:"",
            expirationDate:"",
            additionInfo:"",
          },
          open: false
    })
   })
     
}


  render() {
    const {redirect} =this.state;

    if (redirect) {
      return <Redirect to='/table'/>;
    }

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Update
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Voucher</DialogTitle>
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>

          <DialogContent>
                <Grid container spacing={24} justify = "center" style={{width:"400px",margin:"0 auto"}}> 
                <Grid xs={12} md={12}  >
                  <Input
                    inputType={"hidden"}
                     required={"required"}
                     readonly={'readonly'}
                    value={this.state.newUser.voucherType}
                    fullWidth

                  >
                  </Input>
                </Grid >
                <Grid xs={12} md={12}>
                  <Input
                    required
                    inputType={"number"}                  
                    title={"Voucher Value"}
                    name={"value"}
                    value={this.state.newUser.value}
                    fullWidth
                    placeholder={"Enter your Voucher Value in Naira"}
                    handleChange={this.VoucherhandleInput}
                  >
                  </Input>
                  </Grid >
                  
               
                
                  <Grid xs={12} md={12}>
                  <Input 
                    required={"required"}
                    // inputType={"number"}
                     title={"Category"}
                    name={"category"}
                    value={this.state.newUser.category}
                    fullWidth
                    placeholder={"Enter Voucher categorye.g Valentine "}
                    handleChange={this.VoucherDateCharsethandleInput}
                  >
                  </Input>
                  </Grid>
                  <br/>
                  
                  <Grid xs={12}  md={12}>
                    <Input
                        required
                        inputType={"date"}
                        title={"Start Date"}
                        name={"startDate"}
                        value={this.state.newUser.startDate}
                        fullWidth
                        placeholder={"startDate"}
                        handleChange={this.VoucherDateCharsethandleInput}
                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={12}>
                    <Input
                        required
                        inputType={"date"}
                        title={"Expiry Date"}
                        name={"expirationDate"}
                        value={this.state.newUser.expirationDate}
                        fullWidth
                        placeholder={"expirationDate"}
                        handleChange={this.VoucherDateCharsethandleInput}
                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={12}>
                  <TextArea
                     title={"additionalInfo Information"}
                     rows={2}
                     value={this.state.newUser.additionalInfo}
                     name={"currentPetInfo"}
                     handleChange={this.handleTextArea}
                     placeholder={"additionalInfo Information"}
        />
                  </Grid>
                 
                 

              
        </Grid>
        
          </DialogContent>
          <DialogActions>
                  <button
                             
                          action={this.handleFormSubmit}                           
                            type='Submit'
                        style={buttonStyle}>
                        
                   UpDate
                </button>

            
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}


export default FormDialog;

