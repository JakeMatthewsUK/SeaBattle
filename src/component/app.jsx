import Grid from "./grid.jsx";
import Input from "./input.jsx";
import "./app.css";

function App() {
  function doStuff() {
    alert("stuff was done");
  }

  return (
    <main>
      <h1>BattleShip</h1>
      <div className="outerGameArea">
        <div></div>
        <Grid doStuff={doStuff} />
        <Input doStuff={doStuff} />
      </div>
    </main>
  );
}

export default App;
