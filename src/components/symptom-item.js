import React, { Component } from 'react';

class SymptomItem extends Component {
  render() {
    return (
      <div>
        <button
          symptom={this.props.symptom}
          onClick={this.props.removeSymptom}
          className="btn btn-light btn-outline-dark mr-2"
        >
          &times;
        </button>
        {this.props.symptom}
      </div>
    );
  }
}

export default SymptomItem;
