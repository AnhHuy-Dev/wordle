import Square from "../square/Square";
import "./board.css";
type BoardProps = {
	board: string[];
};
function Board({ board }: BoardProps) {
	return (
		<div className="board">
			{board.map((value, index) => {
				return <Square key={index} val={value} squareIdx={index} />;
			})}
		</div>
	);
}

export default Board;
