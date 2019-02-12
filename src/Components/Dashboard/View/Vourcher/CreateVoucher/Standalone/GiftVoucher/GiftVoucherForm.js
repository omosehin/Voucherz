import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "../../../../../components/Forms/Input"
import CardBody from "../../../../../components/Card/CardBody";
import Grid from '@material-ui/core/Grid';
import Select from "../../../../../components/Forms/Select"
import TextArea from "../../../../../components/Forms/TextArea"
import axios from "axios";
import {Redirect} from 'react-router-dom';



    
class GiftVourcherForm extends Component {
  state={
      newUser:{
        value:"",
        charset: "",
        voucherType: "Gift",
        length:"",
        category:"",
        lengthPattern:"",
        separator:"",
        prefix:"",
        postfix:"",
        pattern:"",
        startDate:"",
        expirationDate:"",
        additionInfo:"",
      },
      lengthPatterns:["Length","Pattern"],
      charsetOptions:["Numbers","Alphabet","Alphanumeric"],
      disabled:false,
      redirect:false,

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
      
      let {length,pattern } = this.state.newUser;
      switch(value) {
       
          case 'Length':
          pattern = '';
          break;
        case 'Pattern':
        length = '';
          break;
      }

        this.setState(
          prevState => ({
            newUser: {
              ...prevState.newUser,
              length,
              pattern,
              [name]: value
            }
          }),
        );
      }
      
  

  handleTextArea=(e)=>{
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
    const{ voucherType, category, 
            expirationDate,startDate,charset, 
            value, length, prefix, pattern, 
            postfix,additionalInfo,separator,
            lengthPattern} = this.state.newUser;


    let userData={voucherType,value, category, expirationDate,startDate,charset, length, prefix, pattern, postfix,additionalInfo,separator,lengthPattern

    } 
    console.log(userData);
    const voucherData = JSON.stringify(userData)
    console.log(voucherData);
    let token = sessionStorage.getItem('data');
    let email=sessionStorage.getItem('email')

   const headers = {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`

   }
   axios.post(`http://172.20.20.17:8082/api/voucher/gift/single/create/${email}`,voucherData, {"headers": headers})
   .then(res => {
     alert( 'Successfully created with code ');
     console.log("Succesfully Generated")
     this.setState({
      newUser:{
        voucherType:"",
        value:"",
        charset: "",
        lenght:"",
        pattern:"",
        lengthPattern:"",
        separator:"-",
        category:"",
        prefix:"",
        postfix:"",
        startDate:"",
        expirationDate:"",
        additionalInfo:"",
      },
      redirect: true
    })
   })
   .catch((error) => {
     alert( error + " Voucher Creation Failed ")
     this.setState({
      newUser:{
        voucherType:"",
        value:"",
        charset: "",
        lenght:"",
        pattern:"",
        lengthPattern:"",
        separator:"",
        category:"",
        prefix:"",
        postfix:"",
        startDate:"",
        expirationDate:"",
        additionalInfo:"",
      },
    })
   })
     
}

 

 

  render(){
    
    const {redirect} =this.state;
    // const isInvalid =startDate > expirationDate;

    if (redirect) {
      return <Redirect to='/table'/>;
    }


    return (
      
          <CardBody>
    <form className="container-fluid" onSubmit={this.handleFormSubmit}>
                <Grid container spacing={24} justify = "center">
                <Grid xs={12} md={5} style={{margin:"3px"}} >
                <Input
                    inputType={'hidden'}
                     required={"required"}
                     readonly={'readonly'}
                     name={"voucherType"}
                    value={"this.state.newUser.voucherType"}
                    fullWidth

                  >
                  </Input>
                </Grid >
                <Grid xs={12}  md={5}  style={{margin:"3px"}}>
                    <Input
                    required
                        name={"separator"}
                        value={this.state.newUser.separator}
                        inputType={'hidden'}
                        fullWidth
                    >
                    </Input>
               
                  </Grid > 
                <Grid xs={12} md={10}>
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
                  
                <Grid   xs={12} md={5} style={{margin:"3px"}}>
                <Select
                        title={"Charset"}
                        name={"charset"}
                        options={this.state.charsetOptions}
                        value={this.state.newUser.charset}
                        placeholder={"Charset"}
                        handleChange={this.VoucherDateCharsethandleInput}
                        />
                </Grid > 
                <Grid   xs={12} md={5} style={{margin:"3px"}}>
                  <Select
                        required={"required"}
                        title={"length or Patterns"}
                        name={"lengthPattern"}
                        options={this.state.lengthPatterns}
                        value={this.state.newUser.lengthPattern}
                        placeholder={"Length or Pattern"}
                        handleChange={this.VoucherDateCharsethandleInput}
                        handClick={this.handleDisable}

                        />
                </Grid >  
                <Grid xs={12}  md={5}  style={{margin:"3px"}}>
                    <Input
                         required
                        // inputType={"number"}
                        title={"Pattern"}
                        name={"pattern"}
                        value={this.state.newUser.pattern}
                        fullWidth
                        placeholder={"Pattern(##-####)"}
                        handleChange={this.VoucherDateCharsethandleInput}
                        disabled={(this.state.newUser.lengthPattern==="Pattern")? "" : "disabled"}


                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={5}  style={{margin:"3px"}} >
                  <Input
                    required
                    inputType={"number"}
                     title={"Length"}
                    name={"length"}
                    value={this.state.newUser.length}
                    fullWidth
                    placeholder={"Enter Voucher Length"}
                    handleChange={this.VoucherhandleInput}
                    disabled={(this.state.newUser.lengthPattern==="Length")? "" : "disabled"}

                  >
                  </Input>
                  </Grid > 
                  <Grid xs={12} md={5}  style={{margin:"3px"}}>
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
                  <Grid xs={12} md={5}  style={{margin:"3px"}}>
                  <Input
                    // inputType={"number"}
                     title={"Prefix"}
                    name={"prefix"}
                    value={this.state.newUser.prefix}
                    fullWidth
                    placeholder={"Enter Voucher Prefix"}
                    handleChange={this.VoucherDateCharsethandleInput}
                  >
                  </Input>
                  </Grid>
                  
                  <Grid xs={12} md={5}  style={{margin:"3px"}}>
                    <Input
                        // inputType={"number"}
                        title={"Postfix"}
                        name={"postfix"}
                        value={this.state.newUser.postfix}
                        fullWidth
                        placeholder={"Enter Voucher Postfix"}
                        handleChange={this.VoucherDateCharsethandleInput}
                    >
                    </Input>
               
                  </Grid > 
                  
                  <Grid xs={12}  md={5}>
                    <Input
                        inputType={"date"}
                        title={"Start Date"}
                        name={"startDate"}
                        value={this.state.newUser.startDate}
                        fullWidth
                        placeholder={"startDate"}
                        // handleChange={this.VoucherDateCharsethandleInput}
                    >
                    </Input>
               
                  </Grid > 
                  <Grid xs={12} md={10}>
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
                  <Grid xs={12} md={10}>
                  <TextArea
                     title={"additionalInfo Information"}
                     rows={2}
                     value={this.state.newUser.additionalInfo}
                     name={"additionInfo"}
                     handleChange={this.handleTextArea}
                     placeholder={"additionalInfo Information"}
        />
                  </Grid>
                 
                  <Grid xs={4} md={4}>
                  <button
                          action={this.handleFormSubmit}                           
                            type='Submit'
                        style={buttonStyle}>
                   Submit
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
   width: '100%', // Fix IE 11 issue.
  },

};
const buttonStyle = {
  backgroundColor:"#972FAF",
  color:"white",
  width: '81px',
  height: '33px',
  color: 'white',
 };