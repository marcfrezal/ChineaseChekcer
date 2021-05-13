import React, { useState } from 'react';
import {Container, Row} from 'react-bootstrap';
import './GameMap.css'

// Cell Interface
type Cell = {
    color : string,
    isPion : boolean,
    id : number
}


//Array to help visualize map
// const cells : number[][] = [[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//                             [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//                             [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//                             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//                             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
//                             [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
//                             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
//                             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//                             [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
//                             [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//                             [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
//                             [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],]


/*
** 
**  INIT OF MAP CELLS
**
*/

const hexaMap : Cell[][] = [[{ color : "black", isPion : false, id : 1},{ color : "black", isPion : false, id : 2},{ color : "black", isPion : false, id : 3},{ color : "black", isPion : false, id : 4},{ color : "black", isPion : false, id : 5},{ color : "black", isPion : false, id : 6},{ color : "red", isPion : true, id : 7},{ color : "black", isPion : false, id : 8},{ color : "black", isPion : false, id : 9},{ color : "black", isPion : false, id : 10},{ color : "black", isPion : false, id : 11},{ color : "black", isPion : false, id : 12},{ color : "black", isPion : false, id : 13}],
                            [{ color : "black", isPion : false, id : 14},{ color : "black", isPion : false, id : 15},{ color : "black", isPion : false, id : 16},{ color : "black", isPion : false, id : 17},{ color : "black", isPion : false, id : 18},{ color : "red", isPion : true, id : 19},{ color : "red", isPion : true, id : 20},{ color : "black", isPion : false, id : 21},{ color : "black", isPion : false, id : 22},{ color : "black", isPion : false, id : 23},{ color : "black", isPion : false, id : 24},{ color : "black", isPion : false, id : 25},{ color : "black", isPion : false, id : 26}],
                            [{ color : "black", isPion : false, id : 27},{ color : "black", isPion : false, id : 28},{ color : "black", isPion : false, id : 29},{ color : "black", isPion : false, id : 30},{ color : "black", isPion : false, id : 31},{ color : "red", isPion : true, id : 32},{ color : "red", isPion : true, id : 33},{ color : "red", isPion : true, id : 34},{ color : "black", isPion : false, id : 35},{ color : "black", isPion : false, id : 36},{ color : "black", isPion : false, id : 37},{ color : "black", isPion : false, id : 38},{ color : "black", isPion : false, id : 39}],
                            [{ color : "black", isPion : false, id : 40},{ color : "black", isPion : false, id : 41},{ color : "black", isPion : false, id : 42},{ color : "black", isPion : false, id : 43},{ color : "red", isPion : true, id : 44},{ color : "red", isPion : true, id : 45},{ color : "red", isPion : true, id : 46},{ color : "red", isPion : true, id : 47},{ color : "black", isPion : false, id : 48},{ color : "black", isPion : false, id : 49},{ color : "black", isPion : false, id : 50},{ color : "black", isPion : false, id : 51},{ color : "black", isPion : false, id : 52}],
                            [{ color : "blue", isPion : true, id : 53},{ color : "blue", isPion : true ,id : 54},{ color : "blue", isPion : true, id : 55},{ color : "blue", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "brown", isPion : true, id : 62},{ color : "brown", isPion : true, id : 63},{ color : "brown", isPion : true, id : 64},{ color : "brown", isPion : true, id : 65}],
                            [{ color : "blue", isPion : true, id : 53},{ color : "blue", isPion : true ,id : 54},{ color : "blue", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "brown", isPion : true, id : 62},{ color : "brown", isPion : true, id : 63},{ color : "brown", isPion : true, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "black", isPion : false, id : 53},{ color : "blue", isPion : true ,id : 54},{ color : "blue", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "grey", isPion : true, id : 62},{ color : "brown", isPion : true, id : 63},{ color : "brown", isPion : true, id : 64},{ color : "brown", isPion : false, id : 65}],
                            [{ color : "black", isPion : false, id : 53},{ color : "blue", isPion : true ,id : 54},{ color : "grey", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "grey", isPion : true, id : 62},{ color : "brown", isPion : true, id : 63},{ color : "black", isPion : false, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "black", isPion : false, id : 53},{ color : "black", isPion : false ,id : 54},{ color : "grey", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "grey", isPion : true, id : 62},{ color : "grey", isPion : true, id : 63},{ color : "black", isPion : false, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "black", isPion : false, id : 53},{ color : "yellow", isPion : true ,id : 54},{ color : "grey", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "grey", isPion : true, id : 62},{ color : "green", isPion : true, id : 63},{ color : "black", isPion : false, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "black", isPion : false, id : 53},{ color : "yellow", isPion : true ,id : 54},{ color : "yellow", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "grey", isPion : true, id : 62},{ color : "green", isPion : true, id : 63},{ color : "green", isPion : true, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "yellow", isPion : true, id : 53},{ color : "yellow", isPion : true ,id : 54},{ color : "yellow", isPion : true, id : 55},{ color : "grey", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "green", isPion : true, id : 62},{ color : "green", isPion : true, id : 63},{ color : "green", isPion : true, id : 64},{ color : "black", isPion : false, id : 65}],
                            [{ color : "yellow", isPion : true, id : 53},{ color : "yellow", isPion : true ,id : 54},{ color : "yellow", isPion : true, id : 55},{ color : "yellow", isPion : true, id : 56},{ color : "grey", isPion : true, id : 57},{ color : "grey", isPion : true, id : 58},{ color : "grey", isPion : true, id : 59},{ color : "grey", isPion : true, id : 60},{ color : "grey", isPion : true, id : 61},{ color : "green", isPion : true, id : 62},{ color : "green", isPion : true, id : 63},{ color : "green", isPion : true, id : 64},{ color : "green", isPion : true, id : 65}],
                            [{ color : "black", isPion : false, id : 40},{ color : "black", isPion : false, id : 41},{ color : "black", isPion : false, id : 42},{ color : "black", isPion : false, id : 43},{ color : "pink", isPion : true, id : 44},{ color : "pink", isPion : true, id : 45},{ color : "pink", isPion : true, id : 46},{ color : "pink", isPion : true, id : 47},{ color : "black", isPion : false, id : 48},{ color : "black", isPion : false, id : 49},{ color : "black", isPion : false, id : 50},{ color : "black", isPion : false, id : 51},{ color : "black", isPion : false, id : 52}],
                            [{ color : "black", isPion : false, id : 27},{ color : "black", isPion : false, id : 28},{ color : "black", isPion : false, id : 29},{ color : "black", isPion : false, id : 30},{ color : "black", isPion : false, id : 31},{ color : "pink", isPion : true, id : 32},{ color : "pink", isPion : true, id : 33},{ color : "pink", isPion : true, id : 34},{ color : "black", isPion : false, id : 35},{ color : "black", isPion : false, id : 36},{ color : "black", isPion : false, id : 37},{ color : "black", isPion : false, id : 38},{ color : "black", isPion : false, id : 39}],
                            [{ color : "black", isPion : false, id : 14},{ color : "black", isPion : false, id : 15},{ color : "black", isPion : false, id : 16},{ color : "black", isPion : false, id : 17},{ color : "black", isPion : false, id : 18},{ color : "pink", isPion : true, id : 19},{ color : "pink", isPion : true, id : 20},{ color : "black", isPion : false, id : 21},{ color : "black", isPion : false, id : 22},{ color : "black", isPion : false, id : 23},{ color : "black", isPion : false, id : 24},{ color : "black", isPion : false, id : 25},{ color : "black", isPion : false, id : 26}],
                            [{ color : "black", isPion : false, id : 1},{ color : "black", isPion : false, id : 2},{ color : "black", isPion : false, id : 3},{ color : "black", isPion : false, id : 4},{ color : "black", isPion : false, id : 5},{ color : "black", isPion : false, id : 6},{ color : "pink", isPion : true, id : 7},{ color : "black", isPion : false, id : 8},{ color : "black", isPion : false, id : 9},{ color : "black", isPion : false, id : 10},{ color : "black", isPion : false, id : 11},{ color : "black", isPion : false, id : 12},{ color : "black", isPion : false, id : 13}],]




//FUNCTION TO GET POSSIBLE POSITION TO MOVE WITH PION IF I % 2 == 0
function GetPairCellsToMove(selectedCell, hexaMapState, oldCellToMove) {
    let cellsToMovePair : Cell[] = [];

    console.log(oldCellToMove);

    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            for (let l = 0; l < oldCellToMove.length; l++) {
                if (hexaMapState[i][j].id === oldCellToMove[l].id && hexaMapState[i][j].color === "grey") {
                    let cell = document.getElementById(hexaMapState[i][j].id)
                    cell.style.backgroundColor = "rgb(247, 247, 247)"; 
                }
            }
            if (hexaMapState[i][j].id === selectedCell.id - 14 || hexaMapState[i][j].id === selectedCell.id - 13 || hexaMapState[i][j].id === selectedCell.id - 1 || hexaMapState[i][j].id === selectedCell.id + 1 || hexaMapState[i][j].id === selectedCell.id + 12 || hexaMapState[i][j].id === selectedCell.id + 13) {
                if (hexaMapState[i][j].color === "grey" && selectedCell.color !== "grey" && selectedCell.color !== "black") {
                    let cell = document.getElementById(hexaMapState[i][j].id)
                    cell.style.backgroundColor = "darkgrey"; 
                    cellsToMovePair.push(hexaMapState[i][j])
                }
            }
        }
    }
    return (cellsToMovePair);
}




//FUNCTION TO GET POSSIBLE POSITION TO MOVE WITH PION IF I % 2 == 1
function GetImpairCellsToMove(selectedCell, hexaMapState, oldCellToMove) {
    let cellsToMoveImpair : Cell[] = [];

    console.log(oldCellToMove);

    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            for (let l = 0; l < oldCellToMove.length; l++) {
                if (hexaMapState[i][j].id === oldCellToMove[l].id && hexaMapState[i][j].color === "grey") {
                    let cell = document.getElementById(hexaMapState[i][j].id)
                    cell.style.backgroundColor = "rgb(247, 247, 247)"; 
                }
            }
            if (hexaMapState[i][j].id === selectedCell.id - 13 || hexaMapState[i][j].id === selectedCell.id - 12 || hexaMapState[i][j].id === selectedCell.id - 1 || hexaMapState[i][j].id === selectedCell.id + 1 || hexaMapState[i][j].id === selectedCell.id + 13 || hexaMapState[i][j].id === selectedCell.id + 14) {
                if (hexaMapState[i][j].color === "grey" && selectedCell.color !== "grey" && selectedCell.color !== "black") {
                    let cell = document.getElementById(hexaMapState[i][j].id)
                    cell.style.backgroundColor = "darkgrey"; 
                    cellsToMoveImpair.push(hexaMapState[i][j])
                }
            }
        }
    }
    return (cellsToMoveImpair);
}




// FUNCTION TO DETECT POSSIBLES MOVEMENTS
function SelectCellToMove(selectedCell, hexaMapState, oldCellToMove)  {

    let cellsToMove : Cell[] = [];

    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            switch (i % 2) {
                case 0:
                    if (hexaMapState[i][j].id === selectedCell.id) {
                        cellsToMove = GetPairCellsToMove(selectedCell, hexaMapState, oldCellToMove);
                    }
                    break;
                case 1:
                    if (hexaMapState[i][j].id === selectedCell.id) {
                        cellsToMove = GetImpairCellsToMove(selectedCell, hexaMapState, oldCellToMove);
                    }
                    break;
                default:
                    alert("Error");
            }
        }
    }
    return (cellsToMove)
}




// FUNCTION TO RENDER HEXAMAP
const RenderHexaMap = (props) => {


    return (
        <Container>
             {props.hexaMap.map((cells, index) => (
                <Row className="rowHex" >
                    {cells.map((myCell, index) => (
                        <div>{myCell.isPion === true ?  <div className="hexagon" >{myCell.color === "grey" ? <div id={myCell.id} onClick={() => props.selectWhereTogo(myCell)} className="emptyCell"></div> : <div id={myCell.id} className={myCell.color} onClick={() => props.updHexMap(myCell)}></div>}</div> : <div id={myCell.id} className="hexagon1"></div>}</div>
                    ))}
                </Row>
            ))} 
        </Container>
    )
}





// FUNCTION TO INIT ID'S OF EACH PIONS
function InitIdsOfHexaMap(hexaMapState) {
    let id : number = 0
    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            hexaMapState[i][j].id = id;
            id++
        }
    }
    return (hexaMapState);
}



function SwitchPositionPions(fromCell, toCell, toCellsPositions, hexaMap) {

    for (let i = 0; i < hexaMap.length; i++) {
        for (let j = 0; j < hexaMap[i].length; j++) {
            if (hexaMap[i][j].id === toCell.id) {
                for (let l = 0; l < toCellsPositions.length; l++) {
                    if (hexaMap[i][j].id === toCellsPositions[l].id) {
                        let cell = document.getElementById(hexaMap[i][j].id)
                        cell.style.backgroundColor = fromCell.color; 
                        hexaMap[i][j].color = fromCell.color;
                        for (let m = 0; m < hexaMap.length; m++) {
                            for (let n = 0; n < hexaMap[n].length; n++) {
                                if (hexaMap[m][n].id === fromCell.id) {
                                    let cell = document.getElementById(hexaMap[m][n].id)
                                    cell.style.backgroundColor = "rgb(247, 247, 247)"; 
                                    hexaMap[m][n].color = "grey";
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < hexaMap.length; i++) {
        for (let j = 0; j < hexaMap[i].length; j++) {
            for (let l = 0; l < toCellsPositions.length; l++) {
                if (hexaMap[i][j].id === toCellsPositions[l].id && hexaMap[i][j].id !== toCell.id) {
                    let cell = document.getElementById(hexaMap[i][j].id)
                    cell.style.backgroundColor = "rgb(247, 247, 247)"; 
                    hexaMap[i][j].color = "grey";
                }
            }
        }
    }
}


// GAMEMAP FUNCTIONNAL COMPONENT
export default function GameMap() {

    const [hexaMapState, setHexaMapState] = useState(InitIdsOfHexaMap(hexaMap));
    const [cellToMove, setCellToMove] = useState([]);
    const [oldCellToMove, setoldCellToMove] = useState([]);
    const [mainCell, setMainCell] = useState({});


    const handleCellClick = (selectedCell) => {
        let cellsToMove : Cell[] = [];
        
        cellsToMove = SelectCellToMove(selectedCell, hexaMapState, oldCellToMove);
        setCellToMove(SelectCellToMove(selectedCell, hexaMapState, oldCellToMove));
        setoldCellToMove(cellsToMove);
        setMainCell(selectedCell);
        setHexaMapState([...hexaMapState]);
    }

    const handleEmptyCellClick = (selectedEmptyCell) => {
        if (cellToMove.length === 0) {
            alert("Veuillez sélectionner en premier une cellule avec un pion pour pouvoir jouer.");
        }
        SwitchPositionPions(mainCell, selectedEmptyCell, cellToMove, hexaMapState);
        setHexaMapState([...hexaMapState]);
    }


    return (  
      <Container fluid style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <RenderHexaMap hexaMap={hexaMapState} updHexMap={handleCellClick} selectWhereTogo={handleEmptyCellClick}/>
      </Container>
    );
  }