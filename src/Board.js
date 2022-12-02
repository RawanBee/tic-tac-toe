import Square from "./Square";
import { useState, useEffect, useRef } from "react";

const rowStyle = {
  display: "flex",
};

const boardStyle = {
  marginTop: "20px",
  backgroundColor: "#f7ad19",
  width: "308px",
  minHeight: "308px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #f7ad19 solid",
  borderRadius: "5px",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  color: "#053f5c",
  backgroundImage: "linear-gradient(130deg, #f7ad19, #053f5c)",
  minHeight: "100vh",
};

const instructionsStyle = {
  marginTop: "10px",
  marginBottom: "10px",
  fontWeight: "bold",
  fontSize: "20px",
};

const buttonStyle = {
  padding: "10px 25px",
  margin: "30px",
  backgroundColor: "#053f5c",
  border: "solid 0px #053f5c",
  borderRadius: "5px",
  color: "#f7ad19",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};

const spanStyle = {
  backgroundColor: "#053f5c",
  border: "solid 0px #053f5c",
  borderRadius: "5px",
  color: "#f7ad19",
  fontSize: "20px",
  padding: "5px 15px",
  margin: "10px 15px",
};

const Board = () => {
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(0);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const boardRef = useRef(null);

  const resetBoard = () => {
    setReset(true);
    window.location.reload();
  };

  // to draw on the board
  const draw = (event, index) => {
    if (data[index - 1] === "" && winner === "") {
      const current = turn === 0 ? "X" : "O";
      data[index - 1] = current;
      event.target.innerText = current;
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  // to reset the board
  useEffect(() => {
    setData(["", "", "", "", "", "", "", "", ""]);
    // const cells = boardRef.current.children;
    // for (let i = 0; i < cells.length; i++) {
    //   if (cells[i].innerText !== "") {
    //     cells[i].innerText = "";
    //   }
    // }

    setTurn(0);

    setWinner("");
    setReset(false);
  }, [reset, setReset, setWinner]);

  // to check for a winner
  useEffect(() => {
    const checkRow = () => {
      let ans = false;
      for (let i = 0; i < 9; i += 3) {
        ans |=
          data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "";
      }
      return ans;
    };

    const checkCol = () => {
      let ans = false;
      for (let i = 0; i < 3; i++) {
        ans |=
          data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "";
      }
      return ans;
    };

    const checkDiagonal = () => {
      return (
        (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
        (data[2] === data[4] && data[2] === data[6] && data[2] !== "")
      );
    };

    const checkWin = () => {
      return checkRow() || checkCol() || checkDiagonal();
    };

    const checkTie = () => {
      let count = 0;
      data.forEach((cell) => {
        if (cell !== "") {
          count++;
        }
      });
      return count === 9;
    };

    if (checkWin()) {
      setWinner(turn === 0 ? "O Wins!" : "X Wins!");
    } else if (checkTie()) {
      setWinner("It's a Tie!");
    }
  }, [data, turn]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player <span style={spanStyle}>{turn === 0 ? "X" : "O"}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner
        <span style={spanStyle}>
          {winner !== "" ? ` Congrats ${winner}` : ` None`}
        </span>
      </div>

      <div ref={boardRef} style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square draw={draw} position={1} />
          <Square draw={draw} position={2} />
          <Square draw={draw} position={3} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square draw={draw} position={4} />
          <Square draw={draw} position={5} />
          <Square draw={draw} position={6} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square draw={draw} position={7} />
          <Square draw={draw} position={8} />
          <Square draw={draw} position={9} />
        </div>
      </div>
      <button onClick={() => resetBoard()} style={buttonStyle}>
        Reset
      </button>
    </div>
  );
};

export default Board;
