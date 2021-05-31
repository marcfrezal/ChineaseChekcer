import React, {useContext, useEffect, useState} from 'react';
import StyleSheet from 'react';
import io from 'socket.io-client';
import {Container, Row, Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {SocketContext} from '../context/socket';



//IMPORT COMPONENTS
import GameScreen from './GameScreen'



export default function InitGameScreen() {

    const [player, setPlayer] = useState({});
    const [players, setPlayers] = useState([]);
    const [playerID, setPlayerID] = useState("");
    const history = useHistory();
    const socket = useContext(SocketContext) || io();


    useEffect(() => {

        socket.on('connectionbro', (socketId) => {
            setPlayerID(socketId)
            socket.off("connectionbro")
        })

        socket.on('getPlayersArray', (data) => {
            setPlayers([]);
            setPlayers([...data]);
            socket.off("getPlayersArray")
        })
    })

    const handleSelectColor = (color: string) => {
        // Generate or get roomId here
        setPlayer({id: playerID, color: color, roomId: 'test'});
    }

    const handleClickToPlay = () => {
        socket.emit('newPlayer', player);
        socket.on('getRoom', (roomId) => {
            history.push('/game/' + roomId);
        });
    }

    return (
        <div>
            hello {playerID}
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control as="select" onChange={e => handleSelectColor(e.target.value)}>
                    <option>----Choisissez une couleur-----</option>
                    <option  value={'red'}>Rouge</option>
                    <option value={'brown'}>Marron</option>
                    <option value={'green'}>Vert</option>
                    <option value={'pink'}>Rose</option>
                    <option value={'yellow'}>Jaune</option>
                    <option value={'blue'}>Bleu</option>
                </Form.Control>
            </Form.Group>
            <Button onClick={() => handleClickToPlay()}>Go play</Button>
        </div>
    );
}

