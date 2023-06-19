import { useDispatch, useSelector } from "react-redux";
import Key from "../key/Key";
import "./keyboard.css";
import { RootState } from "../../interface";
import { addInputWord, dcrPos, incRow, setBoards, setInputWord } from "../../redux/boardSlice";
import wordList from "../../word.json";
import Result from "../result/Result";
import { useState } from "react";
type ResultProps = {
	title: string;
	show: boolean;
	showConfetti: boolean;
};
function Keyboard() {
	const rows: string[] = ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m"];
	const dispatch = useDispatch();
	const correctWord = useSelector((state: RootState) => state.board.correctWord);
	const board = useSelector((state: RootState) => state.board.board);
	const pos = useSelector((state: RootState) => state.board.pos);
	const row = useSelector((state: RootState) => state.board.row);
	const currentRow = Math.floor((pos - 1) / 5);
	const allWords: string[] = wordList.words;
	let board5Words: string = `${board[pos - 5]}${board[pos - 4]}${board[pos - 3]}${board[pos - 2]}${board[pos - 1]}`.toLowerCase();

	const [result, setResult] = useState<ResultProps>({
		title: "",
		show: false,
		showConfetti: false,
	});

	const clickBack = () => {
		if (pos <= 0) return;
		if (currentRow !== row) return;
		const newBoard = [...board];
		newBoard[pos - 1] = "";
		dispatch(dcrPos());
		dispatch(setBoards(newBoard));

		if (correctWord.includes(board[pos - 1])) dispatch(addInputWord(board[pos - 1]));
	};
	console.log(correctWord);

	const clickEnter = () => {
		if (Math.floor(pos / 5) === row) return;
		if (allWords.includes(board5Words) === false) return;
		if (correctWord === board5Words.toUpperCase() && pos <= 30) {
			dispatch(incRow());
			setTimeout(
				() =>
					setResult({
						title: "Congratulation",
						show: true,
						showConfetti: true,
					}),
				1200
			);
			return;
		} else if (allWords.includes(board5Words)) {
			if (pos === 30)
				setTimeout(
					() =>
						setResult({
							title: "Bad Luck!",
							show: true,
							showConfetti: false,
						}),
					1200
				);
			if (pos % 5 === 0 && pos !== 0) {
				dispatch(setInputWord());
				dispatch(incRow());
			}
		}
	};
	return (
		<div className="keyboard-container">
			{rows.map((row, index) => {
				return (
					<div className="row" key={index}>
						{index == 2 && (
							<span className="letter-row enter-word" onClick={clickEnter}>
								Enter
							</span>
						)}
						{row.split(" ").map((item, index) => {
							return (
								<div className="letter-row" key={index}>
									<Key key={index} letter={item.toUpperCase()} />
									{item === "m" && <span onClick={() => clickBack()}>Back</span>}
								</div>
							);
						})}
					</div>
				);
			})}
			{result.show && <Result title={result?.title} showConfet={result?.showConfetti} setResult={setResult} />}
		</div>
	);
}

export default Keyboard;
