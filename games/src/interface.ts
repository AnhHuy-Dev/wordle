export interface BoardState {
	board: string[];
	pos: number;
	row: number;
	correctWord: string;
	inputWord: string[];
}

export interface RootState {
	board: BoardState;
}
