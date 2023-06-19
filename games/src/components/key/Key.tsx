import { useDispatch, useSelector } from "react-redux";
import "./key.css";
import { RootState } from "../../interface";
import { incPos, setBoards } from "../../redux/boardSlice";

type KeyProps = {
	letter: string;
};
function Key({ letter }: KeyProps) {
	const board = useSelector((state: RootState) => state.board.board);
	const pos = useSelector((state: RootState) => state.board.pos);
	const row = useSelector((state: RootState) => state.board.row);
	const inputWord = useSelector((state: RootState) => state.board.inputWord);
	const dispath = useDispatch();
	const currentRow = Math.floor(pos / 5);

	const chooseLetter = () => {
		if (pos === board.length) return;
		if (currentRow > row) return;
		const newBoard = [...board];
		newBoard[pos] = letter;
		dispath(setBoards(newBoard));
		dispath(incPos());
		console.log(inputWord);
	};
	return (
		<div className="letter" onClick={chooseLetter}>
			{letter}
		</div>
	);
}

export default Key;
