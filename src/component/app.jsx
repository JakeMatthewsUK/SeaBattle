import Input from "./input.jsx";
import "./app.css";
import GameBoard from "./gameBoard.jsx";

function App() {

    function handleClick(){

    }

  return (
    <main>
      <h1>BattleShip</h1>
      <div className="outerGameArea">
        <div></div>
        <GameBoard handleClick={handleClick}/>
        <Input handleClick={handleClick}/>
      </div>
    </main>
  );
}

export default App;
