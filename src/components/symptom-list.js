import React, { Component } from 'react';

import SymptomItem from './symptom-item.js'

class SymptomList extends Component {
  render() {
    return (
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
    )
  }
}

export default SymptomList;
