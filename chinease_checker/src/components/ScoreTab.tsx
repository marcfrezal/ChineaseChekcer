import React, { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import './ScoreTab.css'

// SCORETAB FUNCTIONNAL COMPONENT
export default function ScoreTab() {

    return (  
      <Container className="scoreMainContainer">
          <Row className="scoreRowTitle">
            <Col className="scoreColTitle">Score Board</Col>
          </Row>
          <Row className="scoreRow">
            <Col className="scoreCol"><div>Player 1 : </div> <div>Color : </div> <div>Points : </div></Col>
            <Col className="scoreCol"><div>Player 2 : </div> <div>Color : </div> <div>Points : </div></Col>
          </Row>
          <Row className="scoreRow">
            <Col className="scoreCol"><div>Player 3 : </div> <div>Color : </div> <div>Points : </div></Col>
            <Col className="scoreCol"><div>Player 4 : </div> <div>Color : </div> <div>Points : </div></Col>
          </Row>
          <Row className="scoreRow">
            <Col className="scoreCol"><div>Player 5 : </div> <div>Color : </div> <div>Points : </div></Col>
            <Col className="scoreCol"><div>Player 6 : </div> <div>Color : </div> <div>Points : </div></Col>
          </Row>
      </Container>
    );
  }