import React from "react";
import GridSquare from "./gridSquare";
import deployFleet from "./deployFleet";
import createInitialArray from "./createInitialArray";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fleet: deployFleet(),
      squareArray: createInitialArray(),
      shipsLeft: 3,
      displayButtonClass: "deployButton",
      displayButtonText: "Deploy Ships",
    };
    this.handleClick = this.handleClick.bind(this);
    this.placeShips = this.placeShips.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  restartLoop() {
    if (this.state.shipsLeft === 0) {
      this.setState({
        displayButtonClass: "gameOverButton",
        displayButtonText: "Game Over. Click to restart.",
      });
    }
  }

  restartGame() {
    this.setState({
      fleet: deployFleet(),
      squareArray: createInitialArray(),
      shipsLeft: 3,
      displayButtonClass: "deployButton",
      displayButtonText: "Deploy Ships",
    });
  }

  handleClick(e) {
    let currentClass = e.target.className;

    if (currentClass.search("hit") === -1) {
      e.target.className += " hit";
      const column = parseInt(e.target.getAttribute("columnnumber"));
      const row = parseInt(e.target.getAttribute("rownumber"));
      const arrayPosition = column * 10 + row;
      let currentContents = this.state.squareArray[arrayPosition].contents;
      currentContents += " hit";
      this.setState((prev) => {
        prev.squareArray[arrayPosition].contents = currentContents;
      });

      const { fleet } = this.state;
      if (currentClass.search("ship") !== -1) {
        for (let i = 0; i < fleet.shipNames.length; i++) {
          const shipName = fleet.shipNames[i];
          if (currentClass.search(shipName) !== -1) {
            let currentHitPoints = fleet[shipName].hitpoints;
            this.setState(
              (prev) => {
                prev.fleet[shipName].hitpoints = currentHitPoints - 1;
              },
              () => this.checkIfSunk(shipName)
            );
          }
        }
      }
    }
  }
  checkIfSunk(shipName) {
    const { fleet } = this.state;
    if (fleet[shipName].hitpoints === 0) {
      const shipPositions = fleet[shipName].cellPositions;
      for (let i = 0; i < shipPositions.length; i++) {
        const column = shipPositions[i].columnNumber;
        const row = shipPositions[i].rowNumber;
        const arrayPosition = column * 10 + row;

        let currentContents = this.state.squareArray[arrayPosition].contents;
        currentContents += " sunk";
        this.setState((prev) => {
          prev.squareArray[arrayPosition].contents = currentContents;
        });
      }
      let shipsRemaining = this.state.shipsLeft - 1;
      this.setState({ shipsLeft: shipsRemaining }, () => this.restartLoop());
    }
  }

  handleButtonClick(e) {
    if (this.state.displayButtonText === "Deploy Ships") {
      this.placeShips(e);
    } else {
      this.restartGame();
    }
  }

  placeShips(e) {
    this.setState({ displayButtonClass: "hiddenButton" });

    for (let i = 0; i < 3; i++) {
      let currentShip = this.state.fleet[this.state.fleet.shipNames[i]];

      for (let j = 0; j < currentShip.cellPositions.length; j++) {
        const col = currentShip.cellPositions[j].columnNumber;
        const row = currentShip.cellPositions[j].rowNumber;
        const arrayPosition = col * 10 + row;
        this.setState((prev) => {
          prev.squareArray[arrayPosition].contents = "ship " + currentShip.name;
        });
      }
    }
  }

  render() {
    return (
      <section className="grid" id="grid">
        {this.state.squareArray.map((square) => {
          return (
            <GridSquare
              columnNumber={square.columnNumber}
              rowNumber={square.rowNumber}
              baseClass={square.baseClass}
              contents={square.contents}
              onClick={this.handleClick}
              key={square.columnNumber + "" + square.rowNumber}
            />
          );
        })}
        <button
          className={this.state.displayButtonClass}
          onClick={this.handleButtonClick}
        >
          {this.state.displayButtonText}
        </button>
      </section>
    );
  }
}

export default GameBoard;
