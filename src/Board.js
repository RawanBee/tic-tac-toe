import { useMemo, useState } from "react";
import Square from "./Square";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const MARKER_SYMBOLS = {
  X: "✕",
  O: "◯",
};

const toSymbol = (marker) => MARKER_SYMBOLS[marker] ?? "";

const getWinner = (board) => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = useMemo(() => getWinner(board), [board]);
  const isTie = useMemo(
    () => !winner && board.every((cell) => cell !== ""),
    [board, winner]
  );
  const gameOver = Boolean(winner || isTie);

  const handleMove = (index) => {
    if (board[index] || gameOver) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = isXTurn ? "X" : "O";
    setBoard(nextBoard);
    setIsXTurn((prev) => !prev);
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };

  return (
    <section className="game-card" aria-label="Tic Tac Toe Game">
      <div id="statusArea" className="status">
        {winner ? (
          <>
            Winner <span className="status-pill">{toSymbol(winner)}</span>
          </>
        ) : isTie ? (
          <span className="status-pill">It&apos;s a tie!</span>
        ) : (
          <>
            Next player{" "}
            <span className="status-pill">{toSymbol(isXTurn ? "X" : "O")}</span>
          </>
        )}
      </div>

      <div className="board" role="grid" aria-label="Game board">
        {board.map((value, index) => (
          <Square
            key={index}
            value={toSymbol(value)}
            position={index + 1}
            onClick={() => handleMove(index)}
            disabled={gameOver || value !== ""}
          />
        ))}
      </div>

      <button className="reset-btn" onClick={resetBoard} type="button">
        New Game
      </button>
    </section>
  );
};

export default Board;
