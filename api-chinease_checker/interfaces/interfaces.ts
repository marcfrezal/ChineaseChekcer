export interface PlayerData {
    id: string;
    color: string;
    roomId: string;
}

export interface Room {
    id: string;
    turn: string;
    players: string[];
    selectedCellColor?: string;
}
