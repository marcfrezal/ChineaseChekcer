import React from 'react';
import './App.css';

//Export Screens
import GameScreen from './screens/GameScreen';
import ScoreTab from './components/ScoreTab';

function App() {
  return (
    <div className="App">
      <GameScreen/>
    </div>
  );
}

export default App;
