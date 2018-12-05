import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';
//import GenderSelector from './components/gender-selector';
import SymptomSelector from './components/symptom-selector';

var titleStyle = {
  fontFamily: 'Pacifico, cursive',
  fontSize: '30px',
}

class App extends Component {
  render() {
    return (
      <div className="App container mt-2">
        <header className="App-header">
      {/* <GenderSelector /> */}
          <div style={titleStyle} className="mb-3 text-center">
            easytoubib
          </div>
        </header>
        <SymptomSelector />
      </div>
    );
  }
}

export default App;
