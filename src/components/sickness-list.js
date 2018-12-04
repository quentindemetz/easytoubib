import React, { Component } from 'react';
import SicknessItem from './sickness-item'

class SicknessList extends Component {
  render() {
    if (this.props.sicknesses.length === 0) return <div />;
    return (
      <div>
        <h3>Maladies</h3>
        <div className="list-group">
          {this.props.sicknesses.map(s =>
            <SicknessItem sickness={s} key={s} />
          )}
        </div>
      </div>
    );
  }
}

export default SicknessList;
