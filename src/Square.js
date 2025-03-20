const squareStyle = {
  minWidth: "6rem",
  minHeight: "6rem",
  backgroundColor: "white",
  margin: "4px",
  display: "flex",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  color: "#053f5c",
  borderRadius: "4px",
};

const Square = ({ position, draw }) => {
  return (
    <div
      className={`square ${position}`}
      style={squareStyle}
      onClick={(e) => draw(e, position)}
    ></div>
  );
};

export default Square;
