import Input from "./input.jsx";
import "./app.css";
import TestBoard from "./gameBoard.jsx";
import React from "react";
import DeployFleet from "./deployFleet";
import GameButton from "./gameButton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipsLeft: 3,
      gridArray: DeployFleet()[0],
      fleet: DeployFleet()[1],
      gameState: "initial",
    };

    this.reduceHitpoints = this.reduceHitpoints.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(e) {
    if (this.state.gameState === "initial") {
      this.setState({ gameState: "inplay" });
    } else if (this.state.gameState === "final") {
      this.setState({
        shipsLeft: 3,
        gridArray: DeployFleet()[0],
        fleet: DeployFleet()[1],
        gameState: "initial",
      });
    }
  }

  handleClick(e) {
    if (this.state.gameState === "inplay") {
      let cellIndex = e.target.id;
      let currentGridState = this.state.gridArray;

      if (!currentGridState[cellIndex].bombed) {
        currentGridState[cellIndex].bombed = true;
        if (currentGridState[cellIndex].ship) {
          this.reduceHitpoints(currentGridState[cellIndex].ship);
        }
      }

      this.setState({
        gridArray: currentGridState,
      });
    }
  }

  reduceHitpoints(shipName) {
    let fleetStatus = this.state.fleet;
    fleetStatus[shipName].hitpoints--;
    this.setState({
      fleet: fleetStatus,
    });
    if (fleetStatus[shipName].hitpoints === 0) {
      let gridStatus = this.state.gridArray;

      for (let i = 0; i < gridStatus.length; i++) {
        if (gridStatus[i].ship === shipName) {
          gridStatus[i].sunk = true;
        }
      }
      let newShipsLeft = this.state.shipsLeft - 1;
      this.setState(
        {
          gridArray: gridStatus,
          shipsLeft: newShipsLeft,
        },
        () => {
          if (this.state.shipsLeft === 0) {
            this.setState({ gameState: "final" });
          }
        }
      );
    }
  }

  render() {
    return (
      <main>
        <h1>BattleShip</h1>
        <div className="outerGameArea">
          <div></div>
          <TestBoard
            handleClick={this.handleClick}
            gridArray={this.state.gridArray}
          />
          <Input
            handleClick={this.handleClick}
            gameState={this.state.gameState}
          />
          <GameButton
            gameState={this.state.gameState}
            handleButtonClick={this.handleButtonClick}
          />
        </div>
      </main>
    );
  }
}

export default App;
