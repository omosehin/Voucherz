 import React, { Component } from 'react';
import  './Spinner.css';
class Spinner extends Component {
    render() {
        return (
            <div class="spinner">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          
          </div>
        );
    }
}

export default Spinner;