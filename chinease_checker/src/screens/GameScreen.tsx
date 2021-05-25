import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './GameScreen.css'

//IMPORT COMPONENT
import GameMap from "../components/GameMap"
import ScoreTab from "../components/ScoreTab";

export default function GameScreen() {

  return (
    <Container fluid className="containerGameScreen" >
      <Row className="rowGameScreen">
        {/* <Col md={5}>
          <Container>
            <Row className="rowGameTitle">Epinease Checker</Row>
            <Row >
              <Col className="cardGameScore">
                <ScoreTab/>
              </Col>
            </Row>
          </Container>
        </Col> */}
        <Col className="colGamePlate" md={12}>
          <div className="cardGamePlate shadow">
            <GameMap/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
