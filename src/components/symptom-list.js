import React, { Component } from 'react';

import SymptomItem from './symptom-item.js'

class SymptomList extends Component {
  render() {
    if (this.props.symptoms.length === 0) return <div />;
    return (
      <div className="mb-3">
        <h3>Symptômes</h3>
        <div className="list-group">
          {this.props.symptoms.map(s =>
            <SymptomItem
              symptoms={this.props.symptoms}
              symptom={s}
              key={s}
              removeSymptom={this.props.removeSymptom}
            />
          )}
        </div>
      </div>
    )
  }
}

export default SymptomList;
