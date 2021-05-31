import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import {SocketContext, socket} from './context/socket';

import './App.css';

//Import Screens
import GameScreen from './screens/GameScreen';
import InitGameScreen from './screens/InitGameScreen';

type Player = {
    id: any,
    color: string
}


export default function App() {
    return (
        <SocketContext.Provider value={socket}>
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/game/:roomId">
                        <GameScreen/>
                    </Route>
                    <Route path="/">
                        <InitGameScreen />
                    </Route>
                </Switch>
            </div>
        </Router>
        </SocketContext.Provider>
    );
};

