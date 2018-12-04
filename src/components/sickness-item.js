import React, { Component } from 'react';

class SicknessItem extends Component {
  render() {
    return (
      <div className="list-group-item">
        {this.props.sickness.label} ({this.props.sickness.matches}/{this.props.sickness.total})
      </div>
    );
  }
}

export default SicknessItem;
