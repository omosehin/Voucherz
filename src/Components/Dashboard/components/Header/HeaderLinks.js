import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import SignOut from "../../../../AuthenticationAuth/SignOut"



import Button from "../CustomButtons/Button";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
   
    loading: true,
    open: false
  };
  // componentDidMount(){
  //   this.performSearch();
  // }

  // performSearch=(query='')=>{
  //   fetch()
  //   .then(response=>response.json())
  //   .then(responseData =>{
  //     this.setState({
  //       results:responseData.results,
  //       loading:false
  //     });
  //   })
  //   .catch(error=>{
  //     console.log('Error fetching and parsing data',error)
  //   })
  // }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    let email=sessionStorage.getItem('email')

    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div
      
        style={{marginRight:'20px'}}
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justicon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
        >
                {`Welcome ${email} to VOUCHERZ`}

        
           <SignOut/>
          
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
