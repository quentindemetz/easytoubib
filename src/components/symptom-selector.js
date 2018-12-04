import React, { Component } from 'react';

import { symptoms } from '../medicalData';
import diagnose from '../reducers/diagnostic';
import SymptomList from './symptom-list'
import SicknessList from './sickness-list'

const DEFAULT_DROPDOWN = [symptoms, "Tous les symptômes"]

class SymptomSelector extends Component {
  render() {
    return (
      <form>
        <div>
          <h3>Symptômes</h3>
          <SymptomList
            symptoms={this.state.symptoms}
            removeSymptom={this.removeSymptom}
          />
        </div>

        { this.state.dropdowns.map(d =>
          <div className="form-group" key={d[1]}>
            <label className="mr-2">
              {d[1]}
            </label>
            <select onChange={this.addSymptom}>
              {d[0].map(s => 
                <option key={s} value={s}>
                  {s}
                </option>
              )}
            </select>
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

  addSymptom = (event) => {
    let symptom = event.target.value;
    event.target.value = null;
    this.setState((state, props) => {
      var newSymptoms = this.state.symptoms.concat([symptom]);
      return this.cascadeUpdateState(newSymptoms);
    });
  }

  cascadeUpdateState = (symptoms) => {
    var {lSicknesses, dSymptoms} = diagnose(symptoms);
    var dropdowns = (dSymptoms.length > 0) ? [[dSymptoms, "Symptômes discriminants"], DEFAULT_DROPDOWN] : [DEFAULT_DROPDOWN]
    return {
      symptoms: symptoms,
      likelySicknesses: lSicknesses,
      decidingSymptoms: dSymptoms,
      dropdowns: dropdowns
    }
  }
}

SymptomSelector.defaultProps = {

}

export default SymptomSelector;
