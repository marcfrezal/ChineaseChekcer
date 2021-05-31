import React, {useContext, useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import './GameMap.css';
import io from 'socket.io-client';
import ScoreTab from "./ScoreTab";
import {useParams} from 'react-router-dom';
import {SocketContext} from "../context/socket";
import {PlayerData} from "../interfaces/intefaces";

// Cell Interface
type Cell = {
    color : string,
    isPion : boolean,
    id : number
}

// CellToWin Interface
type AreaToWin = {
    color : string,
    colorChallenger : string,
    id : number,
    cells : number []
}

// Turn Interface
type Turn  = {
    prevPlayerColor : string,
    actualPlayerColor : string
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


/*
** 
**  INIT OF WIN AREAS
**
*/

const areasToWin : AreaToWin[] = [{id : 1, color : "red", colorChallenger : "pink", cells : [6, 18, 19, 31, 32, 33, 43, 44, 45, 46]},
                                  {id : 2, color : "brown", colorChallenger : "yellow", cells : [61, 62, 63, 64, 74, 75, 76, 88, 89, 101]},
                                  {id : 3, color : "green", colorChallenger : "blue", cells : [127, 140, 141, 152, 153, 154, 165, 166, 167, 168]},
                                  {id : 4, color : "pink", colorChallenger : "red", cells : [173, 174, 175, 176, 187, 188, 189, 200, 201, 214]},
                                  {id : 5, color : "yellow", colorChallenger : "brown", cells : [118, 131, 132, 143, 144, 145, 156, 157, 158, 159]},
                                  {id : 6, color : "blue", colorChallenger : "green", cells : [52, 53, 54, 55, 65, 66, 67, 79, 80, 92]}]


//FUNCTION TO GET POSSIBLE POSITION TO MOVE WITH PION IF I % 2 == 0
function GetPairCellsToMove(selectedCell, hexaMapState, oldCellToMove) {
    let cellsToMovePair : Cell[] = [];

    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            for (let l = 0; l < oldCellToMove.length; l++) {
                if (hexaMapState[i][j].id === oldCellToMove[l].id && hexaMapState[i][j].color === "grey") {
                    let cell = document.getElementById(hexaMapState[i][j].id);
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

    for (let i = 0; i < hexaMapState.length; i++) {
        for (let j = 0; j < hexaMapState[i].length; j++) {
            for (let l = 0; l < oldCellToMove.length; l++) {
                if (hexaMapState[i][j].id === oldCellToMove[l].id && hexaMapState[i][j].color === "grey") {
                    let cell = document.getElementById(hexaMapState[i][j].id);
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

    let isCellValid : boolean = false;

    for (let l = 0; l < toCellsPositions.length; l++) {
        if (toCell.id === toCellsPositions[l].id) {
            isCellValid = true
        }
    }

    if(!isCellValid) {
        return (false);
    }
        

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

    return (true);
}





// FUNCTION TO CHECK IF PLAYER WIN THE GAME

function DidPlayerWin(hexaMap) {

    let red :number = 0;
    let blue :number = 0;
    let yellow: number = 0;
    let green : number = 0;
    let brown : number = 0;
    let pink : number = 0;
    
    for (let i = 0; i < hexaMap.length; i++) {
        for (let j = 0; j < hexaMap[i].length; j++) {
            for (let l = 0; l < areasToWin.length; l++) {
                for (let m = 0; m < areasToWin[l].cells.length; m++) {
                    if (areasToWin[l].cells[m] === hexaMap[i][j].id) {
                        switch(hexaMap[i][j].color) {
                            case "red":
                                if (areasToWin[l].colorChallenger === "red") {
                                    red += 1;
                                }
                                break;
                            case "brown":
                                if (areasToWin[l].colorChallenger === "brown") {
                                    brown += 1;
                                }
                                break;
                            case "green":
                                if (areasToWin[l].colorChallenger === "green") {
                                    green += 1;
                                }
                                break;
                            case "pink":
                                if (areasToWin[l].colorChallenger === "pink") {
                                    pink += 1;
                                }
                                break;
                            case "yellow":
                                if (areasToWin[l].colorChallenger === "yellow") {
                                    yellow += 1;
                                }
                                break;
                            case "blue":
                                if (areasToWin[l].colorChallenger === "blue") {
                                    blue += 1;
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
    if (red === 10)
        alert("RedPlayerWin")
    if (blue === 10)
        alert("BluePlayerWin")
    if (green === 10)
        alert("GreenPlayerWin")
    if (yellow === 10)
        alert("YellowPlayerWin")
    if (brown === 10)
        alert("BrownPlayerWin")
    if (pink === 10)
        alert("PinkPlayerWin")


}



//GET NEXT PLAYER TO MOVE
function getNextPlayerToplay (selectedCell) {
    let color;
    switch (selectedCell.color) {
        case "red":
            color = "brown";
            break;
        case "brown":
            color = "green";
            break;
        case "green":
            color = "pink";
            break;
        case "pink":
            color = "yellow";
            break;
        case "yellow":
            color = "blue";
            break;
        case "blue":
            color = "red";
            break;
        default:
            color = "error";
            break;
    }
    return color;
}

// GAMEMAP FUNCTIONNAL COMPONENT
export default function GameMap() {

    const [hexaMapState, setHexaMapState] = useState(InitIdsOfHexaMap(hexaMap));
    const [cellToMove, setCellToMove] = useState([]);
    const [oldCellToMove, setoldCellToMove] = useState([]);
    const [mainCell, setMainCell] = useState({id : 0, color : "", isPion : false});
    const [turn , setTurn] = useState({prevPlayerColor : null, actualPlayerColor : "red"})
    const [test, setTest] = useState("hello");
    const [player, setPlayer] = useState({});
    const socket = useContext(SocketContext) || io();

    const {roomId} = useParams();

    useEffect(() => {
        socket.emit('getPlayer');
        socket.emit('loadMap', roomId);
    }, [])

    useEffect(() => {

        socket.on('select', (data) => {
            let cellsToMove : Cell[] = [];
            console.log("hi")
            cellsToMove = SelectCellToMove(data.selectedCell, hexaMapState, oldCellToMove);
            console.log(cellsToMove);
            setCellToMove(cellsToMove);
            setoldCellToMove(cellsToMove);
            setMainCell(data.selectedCell);
            setHexaMapState([...hexaMapState]);
            socket.off('move');
            socket.off('select');
        });

        socket.on('move', (data) => {
            let isMoveDone : boolean = SwitchPositionPions(data.mainCell, data.selectedEmptyCell, cellToMove, hexaMapState);
            if (isMoveDone) {
                let nextPlayerToPlay : any = getNextPlayerToplay(data.mainCell);
                socket.emit('nextPlayer', ({roomId: data.player.roomId, nextPlayer: nextPlayerToPlay}));
                setTurn({prevPlayerColor : mainCell.color, actualPlayerColor : nextPlayerToPlay });
                setMainCell({id : 0, color : "", isPion : false});
                DidPlayerWin(hexaMapState);
                console.log(player);
                socket.emit('saveMap', ({hexaMap: hexaMapState, roomId: (player as PlayerData).roomId}));
                socket.off('move');
                socket.off('select');

            }
            setHexaMapState([...hexaMapState]);
        });

        socket.on('loadPlayer', (player: PlayerData) => {
            console.log(player);
            setPlayer(player);
            socket.off('getPlayer');
            socket.off('loadPlayer');
        });

        socket.on('map', ({map, roomTurn}) => {
            console.log(roomTurn);
            const turnTMP = turn;
            turnTMP.actualPlayerColor = roomTurn;
            setTurn(turnTMP);
            setHexaMapState(map);
        })

    })

    const handleCellClick = (selectedCell) => {
        // Get player here
        // if (selectedCell.color !== turn.actualPlayerColor) {
        if (selectedCell.color !== turn.actualPlayerColor || (player as PlayerData).color !== selectedCell.color) {
            alert("Ce n'est pas avous de jouer!");
            return;
        }
        socket.emit('select', {selectedCell, player});
    }

    const handleEmptyCellClick = (selectedEmptyCell) => {
        if (cellToMove.length === 0 || mainCell === null) {
            alert("Veuillez sélectionner en premier une cellule avec un pion pour pouvoir jouer.");
            return;
        }
        socket.emit('move',  {selectedEmptyCell, mainCell, player});
    }


    return (
      <Container fluid style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <div style={{position: 'absolute', top: '6rem', left: '8rem', zIndex: 1}}>
              You are playing:
              <span style={{color: (player as PlayerData).color}}>{' ' + (player as PlayerData).color}</span>
          </div>
          <div style={{position: 'absolute', top: '8rem', left: '8rem', zIndex: 1}}>
              It's the turn of:
              <span style={{color: turn.actualPlayerColor}}>{' ' + turn.actualPlayerColor}</span>
          </div>
          <RenderHexaMap hexaMap={hexaMapState} updHexMap={handleCellClick} selectWhereTogo={handleEmptyCellClick}/>
      </Container>
    );
  }
