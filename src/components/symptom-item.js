import React, { Component } from 'react';

class SymptomItem extends Component {
  render() {
    var buttonStyle = {
      position: 'relative',
      right: '-16px',
      padding: '0px 6px'
    }

    return (
      <div className="list-group-item">
        {this.props.symptom}
        <button
          symptom={this.props.symptom}
          onClick={this.props.removeSymptom}
          className="btn btn-outline-danger btn-sm float-right mr-2"
          style={buttonStyle}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default SymptomItem;
