import React, { useEffect, useState } from 'react';
import  StyleSheet  from 'react';
import io from 'socket.io-client';
import {Container, Row, Form, Button} from 'react-bootstrap';



//IMPORT COMPONENTS
import GameScreen from './GameScreen'

const socket = io('http://localhost:9090', { transports : ['websocket'] , upgrade : false});


export default function InitGameScreen() {

  const [player, setPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [playerID, setPlayerID] = useState("");


  useEffect(() => {

      socket.on('connectionbro', (data) => {
          setPlayerID(data)
          socket.off("connectionbro")
      })

      socket.on('getPlayersArray', (data) => {
        setPlayers([]);
        setPlayers([...data]);
        socket.off("getPlayersArray")
    })
    console.log(players);
  })

  const handleSelectColor = (color) => {
    setPlayer({id : playerID, color : color});
  }

  const handleClickToPlay = () => {
    socket.emit('newPlayer', player);
  }

  return (
    <div>
      hello {playerID}
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Form.Control as="select" onChange={e => handleSelectColor(e.target.value)}>
          <option>----Choisissez une couleur-----</option>
          <option>Rouge</option>
          <option>Marron</option>
          <option>Vert</option>
          <option>Rose</option>
          <option>Jaune</option>
          <option>Bleu</option>
        </Form.Control>
      </Form.Group>
    <Button onClick={() => handleClickToPlay()}>Go play</Button>
    </div>
  );
}

