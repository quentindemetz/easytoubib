import React, { Component } from 'react';

class SicknessItem extends Component {
  render() {
    return (
      <div className="list-group-item">
        {this.props.sickness}
      </div>
    );
  }
}

export default SicknessItem;
