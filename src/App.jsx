import { useState } from "react";

import ActiveGame from "./components/ActiveGame";
import "./index.css";

function App() {
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => setGameActive(true);
  const endGame = () => setGameActive(false);

  const SplashScreen = () => {
    return (
      <section>
        <h2 className="text-2xl">Press button to start game</h2>
        <div className="h-72 w-full flex items-center justify-center">
          <button
            onClick={startGame}
            className="bg-blue-700 text-white text-2xl px-4 py-2 uppercase rounded"
          >
            click me
          </button>
        </div>
      </section>
    );
  };

  return (
    <>
      <header className="py-4 px-8 bg-slate-400">Connect four</header>
      <main className="p-4">
        {gameActive ? <ActiveGame onGameEnd={endGame} /> : <SplashScreen />}
      </main>
    </>
  );
}

export default App;
