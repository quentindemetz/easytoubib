import React, { Component } from 'react';
import { AGES, GENDERS } from '../actions/person.js';

class GenderSelector extends Component {
  render() {
    return (
      <form>
        <h3>Patient</h3>
        {Object.keys(GENDERS).map(gender =>
          <div className="form-group form-check form-check-inline" key={gender}>
            <input
              name="gender"
              type="radio"
              checked={this.state.gender === gender}
              onChange={this.changeGender}
              value={gender}
              className="form-check-input"
            />
            <label className="form-check-label">
              {GENDERS[gender]}
            </label>
          </div>
        )}

        <div className="form-group">
          <label className="mr-2">Age</label>
          <select
            selected={this.state.age}
            onChange={this.changeAge}
           >
              {Object.keys(AGES).map(age =>
                <option key={age} value={age}>
                  {AGES[age]}
                </option>
              )}
          </select>
        </div>
      </form>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      age: null
    }
  }

  changeGender = (event) => {
    let gender = event.target.getAttribute('value');
    this.setState({gender: gender});
  }

  changeAge = (event) => {
    let age = event.target.value;
    this.setState({age: age});
  }
}

export default GenderSelector;
