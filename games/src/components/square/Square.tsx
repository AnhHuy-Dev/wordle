import "./square.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interface";
import { useState, useEffect } from "react";
import { removeInputWord } from "../../redux/boardSlice";

type SquareProps = {
	val: string;
	squareIdx: number;
};
function Square({ val, squareIdx }: SquareProps) {
	const correctWord = useSelector((state: RootState) => state.board.correctWord);
	const pos = useSelector((state: RootState) => state.board.pos);
	const row = useSelector((state: RootState) => state.board.row);
	const [correct, setCorrect] = useState<boolean>(false);
	const [almost, setAlomost] = useState<boolean>(false);
	const [wrong, setWrong] = useState<boolean>(false);
	let inputWord = useSelector((state: RootState) => state.board.inputWord);
	const currentPos = (pos - 1) % 5;
	const dispatch = useDispatch();
	const variants = {
		filled: () => ({
			scale: [1.2, 1],
			trasition: {
				duration: 0.2,
			},
		}),
		unfilled: () => ({
			scale: [1.2, 1],
			trasition: {
				duration: 0.2,
			},
		}),
	};

	useEffect(() => {
		// if (correctWord[currentPos] === val) setCorrect(true);
		// else if (!correct && val != "" && correctWord.includes(val)) setAlomost(true);
		// else if (!correct && val != "" && !correctWord.includes(val)) setWrong(true);
		if (correctWord[currentPos] === val) setCorrect(true);
		else if (!correct && val != "" && inputWord.includes(val)) {
			setAlomost(true);
			dispatch(removeInputWord(val));
		} else if (!correct && val != "" && !inputWord.includes(val)) setWrong(true);
		return () => {
			setCorrect(false);
			setAlomost(false);
			setWrong(false);
		};
	}, [val]);

	const status: any = Math.floor(squareIdx / 5) < row && (correct ? "correct" : almost ? "almost" : wrong ? "wrong" : "");
	return (
		<motion.div animate={val ? "filled" : "unfilled"} variants={variants}>
			<div className={`square ${status}`}>{val}</div>
		</motion.div>
	);
}
export default Square;
