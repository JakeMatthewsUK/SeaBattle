function DeployFleet() {
  let shipNames = ["battleship", "destroyer1", "destroyer2"];
  let fleet = {
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

  let gridArray = [];

  for (let i = 0; i < 100; i++) {
    gridArray.push({
      cellNumber: i,
      ship: false,
      bombed: false,
      sunk: false,
    });
  }

  let currentShip;
  let currentShipCellPositions;

  function positionShips() {
    currentShip = 0;
    while (currentShip < 3) {
      currentShipCellPositions = [];

      let orientation = Math.floor(2 * Math.random())
        ? "vertical"
        : "horizontal";
      let row =
        orientation === "vertical"
          ? Math.floor(
              (10 - fleet[shipNames[currentShip]].hitpoints) * Math.random()
            )
          : Math.floor(10 * Math.random());
      let column =
        orientation === "vertical"
          ? Math.floor(10 * Math.random())
          : Math.floor(
              (10 - fleet[shipNames[currentShip]].hitpoints) * Math.random()
            );

      for (let i = 0; i < fleet[shipNames[currentShip]].hitpoints; i++) {
        currentShipCellPositions.push(
          orientation === "vertical"
            ? { columnNumber: column, rowNumber: row + i }
            : { columnNumber: column + i, rowNumber: row }
        );
      }
      checkPlacement();
    }
  }

  function checkPlacement() {
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (gridArray[r * 10 + c].ship !== false) {
          for (let i = 0; i < currentShipCellPositions.length; i++) {
            if (Math.abs(currentShipCellPositions[i].rowNumber - r) < 2) {
              if (Math.abs(currentShipCellPositions[i].columnNumber - c) < 2) {
                return;
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < currentShipCellPositions.length; i++) {
      let rowPart = currentShipCellPositions[i].rowNumber * 10;
      let columnPart = currentShipCellPositions[i].columnNumber;
      gridArray[rowPart + columnPart].ship = shipNames[currentShip];
    }
    currentShip++;
  }

  positionShips();
  return [gridArray, fleet];
}

export default DeployFleet;
