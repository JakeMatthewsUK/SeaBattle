export function setShipHitpoints() {
  //used to (re)set state at the start of the game
  return {
    battleship: {
      hitpoints: 5,
    },
    destroyer1: {
      hitpoints: 4,
    },
    destroyer2: {
      hitpoints: 4,
    },
  };
}
const fleet = setShipHitpoints(); //generate a fleet to use as a template when attempting to deploy ships below

export function deployFleet() {
  let gridArray = []; //this is returned at the bottom of the function - it will contain the details of what is in each game cell

  for (let i = 0; i < 100; i++) {
    gridArray.push({
      cellNumber: i,
      ship: false, //initially a bool - may stay false, or may change to the name of the ship that is present
      bombed: false, //initially false, true if bombed
      sunk: false, //initially false, true if it contains a sunk ship cell
    });
  }

  let shipNames = Object.keys(fleet); //get the names of the ships in fleet for easy iteration
  let shipIndex; //an integer representing the ship that positionships() is currently attempting to place
  let currentShip; //the ship the function is currently attempting to place
  let currentShipCellPositions; //an object with an array that represent the row and column positions of the cells the ship is placed in

  function positionShips() {
    //randomly picks the top left row and orientation to deploy each of the ships in, then checks if the placement is valid and repeats if not
    shipIndex = 0;
    while (shipIndex < shipNames.length) {
      //continue until all ships have been placed
      currentShip = fleet[shipNames[shipIndex]];
      currentShipCellPositions = [];

      let orientation = Math.floor(2 * Math.random())
        ? "vertical"
        : "horizontal";
      let row =
        orientation === "vertical"
          ? Math.floor(
              (10 - currentShip.hitpoints) * Math.random() //only allow placements that do not go off the bottom of the grid
            )
          : Math.floor(10 * Math.random());
      let column =
        orientation === "vertical"
          ? Math.floor(10 * Math.random())
          : Math.floor(
              (10 - currentShip.hitpoints) * Math.random() //only allow placements that do not go off the right side of the grid
            );

      for (let i = 0; i < currentShip.hitpoints; i++) {
        //limit the number of cells to the length of the ship being placed
        currentShipCellPositions.push(
          orientation === "vertical"
            ? { columnNumber: column, rowNumber: row + i } //eg. to give [{2,1},{2,2},{2,3},{2,4}]
            : { columnNumber: column + i, rowNumber: row } //eg. to give [{2,1},{3,1},{4,1},{5,1}]
        );
      }
      checkPlacement();
    }
  }

  function checkPlacement() {
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        //go through each cell in gridArray
        if (gridArray[r * 10 + c].ship !== false) {
          //if there is already a ship present
          for (let i = 0; i < currentShipCellPositions.length; i++) {
            //go through each cell in the proposed position of the ship
            if (Math.abs(currentShipCellPositions[i].rowNumber - r) < 2) {
              if (Math.abs(currentShipCellPositions[i].columnNumber - c) < 2) {
                return; //if placing the ship would cause ships to overlap or be too close, exit the function and try again
              }
            }
          }
        }
      }
    }
    //otherwise, get the index of each cell the new ship will be in, and adjust the gridArray.ship property at that index to reflect the added ship
    for (let i = 0; i < currentShipCellPositions.length; i++) {
      let rowPart = currentShipCellPositions[i].rowNumber * 10;
      let columnPart = currentShipCellPositions[i].columnNumber;
      gridArray[rowPart + columnPart].ship = shipNames[shipIndex];
    }
    shipIndex++; //move on to placing the next ship
  }

  positionShips();
  return gridArray; //this is used to set App.state at the start of the game
}
