import React, { useState } from 'react';
import {Box, Button, Card, CardContent, Grid, Input, makeStyles, Typography} from "@material-ui/core";
import {Container, Row, Col} from 'react-bootstrap';
import './GameMap.css'

const cells : number[][] = [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],]

const RenderMap = () => {
    return (
        <Container>
             {cells.map((cell, index) => (
                <Row className="row" >
                    {cell.map((myCell, index) => (
                        <div>{myCell === 1 ?  <div className="hexagon"> <div className="pion"></div></div> : <div className="hexagon1"></div>}</div>
                    ))}
                </Row>
            ))} 
        </Container>
    )
}


export default function GameMap() {
    const [canva, setCanvaSize] = useState({canvaWidth : 800, canvaHeight : 800})

    return (  
      <Container fluid style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <RenderMap/>
      </Container>
    );
  }