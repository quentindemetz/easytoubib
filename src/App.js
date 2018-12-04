import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import GenderSelector from './components/gender-selector';
import SymptomSelector from './components/symptom-selector';

class App extends Component {
  render() {
    return (
      <div className="App container mt-3">
        <header className="App-header">
      {/* <GenderSelector /> */}
          <SymptomSelector />
        </header>
      </div>
    );
  }
}

export default App;
