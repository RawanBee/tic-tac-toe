const squareStyle = {
  minWidth: "90px",
  minHeight: "90px",
  backgroundColor: "#053f5c",
  margin: "4px",
  display: "flex",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "40px",
  color: "#f7ad19",
  borderRadius: "5px",
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
