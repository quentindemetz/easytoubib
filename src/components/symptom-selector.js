import React, { Component } from 'react';
import Select from 'react-select';

import { symptoms } from '../medicalData';
import diagnose from '../reducers/diagnostic';
import SymptomList from './symptom-list'
import SicknessList from './sickness-list'

const DEFAULT_DROPDOWN = {
  options: makeOptions(symptoms),
  label: "Tous les symptômes",
}

function makeOptions(symptoms) {
  return symptoms.map(s => ({label: s, value: s}));
}

class SymptomSelector extends Component {
  render() {
    return (
      <form>
        <div className="mb-3">
          <h3>Symptômes</h3>
          <SymptomList
            symptoms={this.state.symptoms}
            removeSymptom={this.removeSymptom}
          />
        </div>

        { this.state.dropdowns.map(d =>
          <div className="form-group" key={d.label}>
            <label className="mr-2 d-none d-sm-none d-md-block">
              {d.label}
            </label>
            <Select
              value={null}
              onChange={this.addSymptom}
              options={d.options}
              placeholder={d.label}
            />
          </div>
        )}

        <SicknessList sicknesses={this.state.likelySicknesses} />
      </form>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      symptoms: [],
      dropdowns: [DEFAULT_DROPDOWN],
      decidingSymptoms: [],
      likelySicknesses: [],
    };
  }

  removeSymptom = (event) => {
    let symptom = event.target.getAttribute("symptom");
    this.setState((state, props) => {
      var newSymptoms = state.symptoms.filter(s => s !== symptom);
      return this.cascadeUpdateState(newSymptoms);
    });
  }

  addSymptom = (option) => {
    let symptom = option.value;
    this.setState((state, props) => {
      var newSymptoms = this.state.symptoms.concat([symptom]);
      return this.cascadeUpdateState(newSymptoms);
    });
  }

  cascadeUpdateState = (mySymptoms) => {
    var {lSicknesses, dSymptoms} = diagnose(mySymptoms);
    var dDropdown = {
      label: "Symptômes discriminants",
      options: makeOptions(dSymptoms)
    }

    var oldDropdown = {
      label: "Tous les symptômes",
      options: makeOptions(symptoms.filter(s => (mySymptoms.indexOf(s) === -1)))
   }
    var dropdowns = (dSymptoms.length > 0) ? [dDropdown, oldDropdown] : [oldDropdown]
    return {
      symptoms: mySymptoms,
      likelySicknesses: lSicknesses,
      decidingSymptoms: dSymptoms,
      dropdowns: dropdowns
    }
  }
}

SymptomSelector.defaultProps = {

}

export default SymptomSelector;
