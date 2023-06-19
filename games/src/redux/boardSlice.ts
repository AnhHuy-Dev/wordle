import { createSlice } from "@reduxjs/toolkit";
import wordList from "../word.json";
let randomNumber = Math.floor(Math.random() * wordList.words.length);
import { BoardState } from "../interface";
let wordRandom = wordList.words[randomNumber].toUpperCase();
const initialState: BoardState = {
	board: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	pos: 0,
	row: 0,
	// correctWord: wordRandom,
	// inputWord: wordRandom.split(""),
	correctWord: "BODED",
	inputWord: ["B", "E", "D", "E", "D"],
};

export const boardSlice = createSlice({
	name: "board",
	initialState: initialState,
	reducers: {
		setBoards: (state, action) => {
			state.board = action.payload;
		},
		incPos: (state) => {
			state.pos = state.pos + 1;
		},
		dcrPos: (state) => {
			state.pos = state.pos - 1;
		},
		incRow: (state) => {
			state.row = state.row + 1;
		},
		playAgain: (state) => {
			let randNumber = wordList.words[Math.floor(Math.random() * wordList.words.length)].toUpperCase();
			state.board = initialState.board;
			state.row = initialState.row;
			state.pos = initialState.pos;
			state.correctWord = randNumber;
			state.inputWord = randNumber.split("");
		},
		addInputWord: (state, action) => {
			state.inputWord.push(action.payload);
		},
		removeInputWord: (state, action) => {
			state.inputWord = state.inputWord.filter((item) => item !== action.payload);
		},
		setInputWord: (state) => {
			state.inputWord = state.correctWord.split("");
		},
	},
});

export const { setBoards, incPos, dcrPos, incRow, playAgain, removeInputWord, setInputWord, addInputWord } = boardSlice.actions;
export default boardSlice.reducer;
