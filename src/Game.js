import Board from "./Board";

const Game = () => {
  return (
    <main className="app">
      <header className="app-header">
        <h1>Tic-Tac-Toe</h1>
        <p>First to connect three wins.</p>
      </header>
      <div className="game-shell">
        <Board />
      </div>
    </main>
  );
};

export default Game;
