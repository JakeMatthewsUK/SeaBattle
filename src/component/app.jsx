import React from "react";
import Gameboard from "./gameBoard.jsx";
import Input from "./input.jsx";
import { deployFleet, setShipHitpoints } from "./deployFleet.jsx";
import GameButton from "./gameButton.jsx";
import "./app.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      shipsLeft: Object.keys(setShipHitpoints()).length, //returns the number of ships the game starts with
      gridArray: deployFleet(), //deployfleet randomly deploys the ships and returns a 100 long array describing the contents of each square
      fleet: setShipHitpoints(), //the fleet object denotes how may hit points each ship has left before sinking
      gameState: "initial", //initial is before the deploy button is pressed, inplay when deploy button is hidden, and final for end of game
    };
    this.reduceHitpoints = this.reduceHitpoints.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBigButtonClick = this.handleBigButtonClick.bind(this);
  }

  handleBigButtonClick(e) {
    if (this.state.gameState === "initial") {
      this.setState({ gameState: "inplay" }); //clicking deploy moves game state from initial to inplay
    } else if (this.state.gameState === "final") {
      this.setState({
        //clicking the buutton at the end of the game resets state to restart the game
        shipsLeft: Object.keys(setShipHitpoints()).length,
        gridArray: deployFleet(),
        fleet: setShipHitpoints(),
        gameState: "initial",
      });
    }
  }

  handleClick(e) {
    //deals with clicks on squares of the grid
    if (this.state.gameState === "inplay") {
      let cellIndex = e.target.id; //get the position of the index in gridArray
      let currentGridState = this.state.gridArray;
      if (!currentGridState[cellIndex].bombed) {
        currentGridState[cellIndex].bombed = true; //if not bombed, mark as bombed
        if (currentGridState[cellIndex].ship) {
          this.reduceHitpoints(currentGridState[cellIndex].ship); //if bombed a ship, reduce its hitpoints
        }
      }

      this.setState({
        gridArray: currentGridState, //update state to re-render square if it changed
      });
    }
  }

  reduceHitpoints(shipName) {
    //first reduce the hitpoints of the ship that was hit:
    let fleetStatus = this.state.fleet;
    fleetStatus[shipName].hitpoints--;
    this.setState({
      fleet: fleetStatus,
    });
    //if this hit sunk the ship, update girdArray to mark that it contains a sunk ship (as the CSS renders these to look different):
    if (fleetStatus[shipName].hitpoints === 0) {
      let gridStatus = this.state.gridArray;

      for (let i = 0; i < gridStatus.length; i++) {
        if (gridStatus[i].ship === shipName) {
          gridStatus[i].sunk = true;
        }
      }
      //update the state properties and cause a render. If no ships left, set state to final for end game message to show
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
        <h1>Sea Battle</h1>
        <div className="outerGameArea">
          <div className="blankDiv"></div>
          <Gameboard //the 10x10 grid
            handleClick={this.handleClick}
            gridArray={this.state.gridArray} //pass down gridArray prop, as this is used by Gameboard as a template to render the grid
          />
          <GameButton //the large button that says 'Deploy Ships' at the start
            gameState={this.state.gameState} //the visibility and text of the button are controlled by props from App.state
            handleBigButtonClick={this.handleBigButtonClick}
          />
          <Input handleClick={this.handleClick} />
        </div>
      </main>
    );
  }
}

export default App;
