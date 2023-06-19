import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interface";
import "./result.css";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { playAgain } from "../../redux/boardSlice";

type ResultProps = {
	title: string;
	show: boolean;
	showConfetti: boolean;
};
interface IProps {
	title: string | undefined;
	showConfet: boolean | undefined;
	setResult: React.Dispatch<React.SetStateAction<ResultProps>>;
}

function Result({ title, showConfet, setResult }: IProps) {
	const row = useSelector((state: RootState) => state.board.row);
	const correctWord = useSelector((state: RootState) => state.board.correctWord);
	const [hidden, setHidden] = useState<boolean>(true);
	const dispatch = useDispatch();
	useEffect(() => {
		setHidden(false);
		setTimeout(() => {
			setHidden(true);
		}, 5000);
	}, []);

	const handlePlay = () => {
		setResult((prev) => {
			return {
				...prev,
				show: false,
			};
		});
		dispatch(playAgain());
	};

	return (
		<>
			<div className="overlay"></div>
			<div className="result-container">
				{showConfet && <Confetti width={400} height={220} hidden={hidden} />}
				<h2>{title}</h2>
				<p className="result-word">
					Correct word is <span>{correctWord}</span>
				</p>
				<p>Number of times you guess: {row}</p>
				<button onClick={handlePlay}>Play again</button>
			</div>
		</>
	);
}

export default Result;
