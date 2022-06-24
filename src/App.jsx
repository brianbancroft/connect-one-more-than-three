import { useState } from "react";
import "./index.css";

function App() {
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => setGameActive(true);

  const SplashScreen = () => {
    return (
      <section>
        <h2 className="text-2xl">Press button to start game</h2>
        <button onClick={startGame}>click me</button>
      </section>
    );
  };

  const ActiveGame = () => {
    return <section className="">game is active</section>;
  };

  return (
    <>
      <header className="py-4 px-8 bg-slate-400">Connect four</header>
      <main className="p-4">
        {gameActive ? <ActiveGame /> : <SplashScreen />}
      </main>
    </>
  );
}

export default App;
