import React from 'react';
import './App.scss';
import { Calculator } from './Components/Calculator/Calculator';

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className='App-title'>calcullator</h1>
      <Calculator />
    </div>
  );
}
