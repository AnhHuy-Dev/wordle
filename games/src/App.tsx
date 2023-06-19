import "./App.css";
import Heading from "./components/heading/Heading";
import Board from "./components/board/Board";
import Keyboard from "./components/keyboard/Keyboard";
import { useSelector } from "react-redux";
import { RootState } from "./interface";

function App() {
	const board = useSelector((state: RootState) => state.board.board);

	return (
		<div className="App">
			<Heading type="h1" title="Wordle" />
			<Heading type="subtitle" title="Another Wordle Clone" />
			<div className="board-container">
				<Board board={board} />
			</div>
			<div className="keyboard">
				<Keyboard />
			</div>
		</div>
	);
}

export default App;
