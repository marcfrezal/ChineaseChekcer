import React, { useEffect } from 'react';
import './App.css';

//Import Screens
import GameScreen from './screens/GameScreen';
import InitGameScreen from './screens/InitGameScreen';

type Player = {
    id : any,
    color : string
}

export default function App() {
  return (
    <div className="App">
      <GameScreen/>
    </div>
  );
};

