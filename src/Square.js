const Square = ({ position, value, onClick, disabled }) => {
  return (
    <button
      className="square"
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Cell ${position}`}
    >
      {value}
    </button>
  );
};

export default Square;
