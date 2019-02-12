import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from "../../../components/Forms/Input"
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';




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
   };
class FormDialog extends React.Component {
  state = {
      open: false,
      fields:{
          startDate: this.props.fields.startDate,
          voucherType: this.props.fields.voucherType,
          value: this.props.fields.value,
          category:this.props.fields.category,
          expirationdate: this.props.fields.expirationdate,
          additionInfo:this.props.fields.additionInfo

      },

   };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
 
  handleChange = (e) => {
      const fields = this.state.fields;
      fields[e.target.name] = e.target.value;

      this.setState({fields});
  }


    

  
  editEvents = () => {    
    console.log('I submit');
        const data = JSON.stringify(this.state.fields);
console.log(data)
    let token =sessionStorage.getItem('data');
    const headers = {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`

    }
    axios.put(`http://172.20.20.17:8082/update/value/${this.props.fields.code}`,data, {"headers": headers})
    .then(res => { 
      alert( 'Successfully updated ');
      console.log("Succesfully updated");
      console.log(res)
      this.setState({
        open: false

      })
    })
    .catch(error => {
      console.log(error);
    });
  }


 

updateEvent = (data) => {
  data['id'] = this.props.fields.id;
  data['uuid'] = this.props.fields.uuid;

  this.props.editEvents(data);
}
  render() {
    const {fields} = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Update Voucher
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">UPDATE</DialogTitle>
          <DialogContent>
                <Grid container spacing={24} justify = "center" style={{width:"400px",margin:"0 auto"}}> 
                <Grid xs={12} md={12}  >
                  <Input
                    inputType={"hidden"}
                     required={"required"}
                     readonly={'readonly'}
                    value={this.state.fields.voucherType}
                    fullWidth

                  >
                  </Input>
                </Grid >
                <Grid xs={12} md={12}>
                  <Input
                    required
                    inputType={"number"}                  
                    title={"Voucher Value"}
                    name="value"
                    value={this.state.fields.value}
                    fullWidth
                    placeholder={"Enter your Voucher Value in Naira"}
                    handleChange={this.handleChange}
                  >
                  </Input>
                  </Grid >
                  
               
                
                  <Grid xs={12} md={12}>
                  <Input 
                    required={"required"}
                    // inputType={"number"}
                     title={"Category"}
                    name="category"
                    value={this.state.fields.category}
                    fullWidth
                    placeholder={"Enter Voucher categorye.g Valentine "}
                    handleChange={this.handleChange}
                  >
                  </Input>
                  </Grid>
                  <br/>
                  
                  <Grid xs={12}  md={12}>
                    <Input
                        required
                        inputType={"date"}
                        title={"Start Date"}
                        name="startDate"
                        value={this.state.fields.startDate}
                        fullWidth
                        placeholder={"startDate"}
                        handleChange={this.handleChange}
                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={12}>
                    <Input
                        required
                        inputType={"date"}
                        title={"Expiry Date"}
                        name="expirationDate"
                        value={this.state.fields.expirationdate}
                        fullWidth
                        placeholder={"expirationDate"}
                        handleChange={this.handleChange}
                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={12}>
                      <Input
                        title={"additionalInfo"}
                        rows={2}
                        value={this.state.fields.additionInfo}
                        name="additionInfo"
                        handleChange={this.handleChange}
                        placeholder={"additionalInfo"}
                          >
                      </Input>
                  </Grid>
        </Grid>
        
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleClose} color="primary"  style={{marginRight: '370px'}} >
              Close
            </Button>
                  <Button
                          onClick={this.editEvents} 
                          // action={this.handleSubmit}                           
                            type='Submit'
                        style={buttonStyle}>
                        
                   UpDate
                </Button>

            
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default FormDialog;

