import { useState } from "react";

import ActiveGame from "./components/ActiveGame";
import "./index.css";

function App() {
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => setGameActive(true);
  const endGame = () => setGameActive(false);

  const SplashScreen = () => {
    return (
      <section className="w-full h-full pt-8 pattern flex justify-center">
        <div className="bg-white w-3/4 h-2/3 rounded border border-black shadow-xl p-8">
          <h2 className="text-2xl my-3">A Sample in React</h2>
          <p className="my-2">
            Connect three plus one is based on the game of a similar name.{" "}
          </p>
          <p className="my-2">
            <a
              href="https://github.com/brianbancroft/connect-one-more-than-three"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline ease-in-out"
            >
              View on Github
            </a>
          </p>
          <div className="h-72 w-full flex items-center justify-center">
            <button
              onClick={startGame}
              className="bg-blue-400 hover:bg-blue-500 active:bg-blue-700 border-b-4 active:border-b-0 border-blue-700 transition-all ease-in-out drop-shadow-xl text-white text-2xl px-4 py-2 uppercase rounded"
            >
              start game
            </button>
          </div>
          <div></div>
        </div>
      </section>
    );
  };

  return (
    <>
      <header className="py-4 px-8 bg-slate-400 border-b-8 ">
        Connect three plus one
      </header>
      <main className="w-screen h-screen flex justify-center">
        {gameActive ? <ActiveGame onGameEnd={endGame} /> : <SplashScreen />}
      </main>
    </>
  );
}

export default App;
