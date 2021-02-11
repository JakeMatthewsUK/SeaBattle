function deployFleet() {
  let shipNames = ["battleship", "destroyer1", "destroyer2"];
  let fleet = {
    shipNames: shipNames,
    battleship: {
      name: "battleship",
      cellPositions: [],
      hitpoints: 5,
      shipLength: 5,
      intact: true,
    },
    destroyer1: {
      name: "destroyer1",
      cellPositions: [],
      hitpoints: 4,
      shipLength: 4,
      intact: true,
    },
    destroyer2: {
      name: "destroyer2",
      cellPositions: [],
      hitpoints: 4,
      shipLength: 4,
      intact: true,
    },

    countActiveShips() {
      return (
        this.battleship.intact + this.destroyer1.intact + this.destroyer2.intact
      );
    },
  };

  let currentShipCellPositions;
  let currentShip;

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
              (10 - fleet[shipNames[currentShip]].shipLength) * Math.random()
            )
          : Math.floor(10 * Math.random());
      let column =
        orientation === "vertical"
          ? Math.floor(10 * Math.random())
          : Math.floor(
              (10 - fleet[shipNames[currentShip]].shipLength) * Math.random()
            );

      for (let i = 0; i < fleet[shipNames[currentShip]].shipLength; i++) {
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
    for (let shipNumber = 0; shipNumber < currentShip; shipNumber++) {
      console.log(fleet[shipNames[shipNumber]].shipLength);
      for (
        let shipCell = 0;
        shipCell < fleet[shipNames[shipNumber]].shipLength;
        shipCell++
      ) {
        for (
          let currentShipCell = 0;
          currentShipCell < currentShipCellPositions.length;
          currentShipCell++
        ) {
          if (
            Math.abs(
              currentShipCellPositions[currentShipCell].rowNumber -
                fleet[shipNames[shipNumber]].cellPositions[shipCell].rowNumber
            ) < 2
          ) {
            if (
              Math.abs(
                currentShipCellPositions[currentShipCell].columnNumber -
                  fleet[shipNames[shipNumber]].cellPositions[shipCell]
                    .columnNumber
              ) < 2
            ) {
              return;
            }
          }
        }
      }
    }
    fleet[shipNames[currentShip]].cellPositions = currentShipCellPositions;
    currentShip++;
  }

  positionShips();

  return fleet;
}

export default deployFleet;
