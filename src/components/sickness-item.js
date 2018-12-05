import React, { Component } from 'react';

var badgeStyle = {
  paddingTop: '5px'
}

var footerStyle = {
  padding: '6px 20px'
}

function Severity(props) {
  if (props.severe) {
    return (
      <span style={badgeStyle} className="badge badge-danger badge-pill">
        GRAVE
      </span>
    )
  }
  return <div />
}

class SicknessItem extends Component {
  render() {
    return (
      <div className={"card mb-2 " + (this.props.sickness.severe ? "border-danger" : "")}>
        <div className="card-header w-100 d-flex justify-content-between">
          {this.props.sickness.label} ({this.props.sickness.matches}/{this.props.sickness.total})
          <Severity severe={this.props.sickness.severe} />
        </div>
        <ul className="list-group list-group-flush">
          {this.props.sickness.description.map(d =>
            <li className="list-group-item" key={d}>
              <small key={d}>{d}</small>
            </li>
          )}
        </ul>
        <div className="card-footer bg-transparent" style={footerStyle}>
          <small>
            Symptômes: {Array.from(this.props.sickness.symptoms).join(', ')}
          </small>
        </div>
      </div>
    );
  }
}

export default SicknessItem;
