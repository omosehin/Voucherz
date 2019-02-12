import React from 'react';
import Switch from '@material-ui/core/Switch';

class Switches extends React.Component {
  


  render() {
    return (
      <div>
        <Switch
          checked={this.props.checkedA}
          onChange={(e)=>this.props.handleChangeB(e)}
          value="checkedA"
          disabled ="true"
        />
        
       
      </div>
    );
  }
}

export default Switches;
