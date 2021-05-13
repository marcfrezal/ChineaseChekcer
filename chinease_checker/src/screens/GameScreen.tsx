import React from 'react';
import {Box, Button, Card, CardContent, Grid, Input, makeStyles, Typography} from "@material-ui/core";
import {Container, Row, Col} from 'react-bootstrap';
import './GameScreen.css'

//IMPORT COMPONENT
import GameMap from "../components/GameMap"

export default function GameScreen() {

  return (
    <Container fluid className="containerGameScreen" >
      <Row className="rowGameScreen">
      <Col md={5}>
          <Container fluid className="containerGameScreen">
            <Row className="rowGameTitle">Epinease Checker</Row>
            <Row>
              <Col>
                <div className="cardGameScore"></div>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="colGamePlate" md={7}>
          <div className="cardGamePlate shadow">
            <GameMap/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
