import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "../../../components/Forms/Input"
import CardBody from "../../../../../Components/Dashboard/components/Card/CardBody";
import Grid from '@material-ui/core/Grid';
// import Select from "../../../components/Forms/Select"
import TextArea from "../../../components/Forms/TextArea"
// import Button from "../../../components/Forms/Button"
import axios from "axios";




    
class GiftVourcherForm extends Component {
  state={
      newUser:{
        value:"",        
        category:"",
        startDate:"",
        expirationDate:"",
        additionInfo:"",
      },
      disabled:false

    }

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
    let userData=this.state.newUser
    console.log(userData);
    axios.post(`http://172.20.20.17:8080/api/voucher/gift/single/create`,  userData )
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert('Gift Voucher  created with Voucher Code' + userData.Code )
      })
      .catch((error)=>{
        console.log(error)
      })
     
}



  render(){
    
   

    return (
      
          <CardBody>
    <form className="container-fluid" onSubmit={this.handleFormSubmit}>
                <Grid container spacing={24} justify = "center" style={{width:"480px",margin:"0 auto"}}> 
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
                 
                  <Grid xs={6} md={6}>
                  <button
                       disabled={!this.isFormValid}
                          action={this.handleFormSubmit}                           
                            type='Submit'
                            
                        style={buttonStyle}>
                   UpDate
                </button>

                </Grid>

              
        </Grid>
        </form>

        </CardBody>
     
      );
  }
 
 
}

export default withStyles(styles)(GiftVourcherForm);

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