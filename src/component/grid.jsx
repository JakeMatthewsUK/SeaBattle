function Grid(props) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ships = {
    battleship: {
      name: "battleship",
      cellPositions: [],
      hitpoints: 5,
      shipLength: 5,
      sunk: false,
    },
    destroyer1: {
      name: "destroyer1",
      cellPositions: [],
      hitpoints: 4,
      shipLength: 4,
      sunk: false,
    },
    destroyer2: {
      name: "destroyer2",
      cellPositions: [],
      hitpoints: 4,
      shipLength: 4,
      sunk: false,
    },
  };
  let invalidPositions = [];
  let shipsLeft = 3;
  const templateCells = [];

  for (let numberPos = 0; numberPos < 10; numberPos++) {
    for (let letterPos = 0; letterPos < 10; letterPos++) {
      let nextCell = {
        key: letters[letterPos] + numbers[numberPos],
        sunk: false,
      };
      templateCells.push(nextCell);
    }
  }
  function checkPlacement(ship, cellPositions) {
    for (let i = 0; i < cellPositions.length; i++) {
      //check that each position is valid
      for (let pos = 0; pos < invalidPositions.length; pos++) {
        if (
          invalidPositions[pos][0] === cellPositions[i][0] &&
          invalidPositions[pos][1] === cellPositions[i][1]
        ) {
          //ie it is not within 1 space of a different ship
          return; //if it is, abort
        }
      }
    }
    ships[ship].cellPositions = cellPositions;

    for (let i = 0; i < cellPositions.length; i++) {
      for (let j = 0; j < cellPositions[i].length; j++) {
        let shipCell = document.querySelector(
          `div.square[data-colrow= ${
            letters[cellPositions[i][0]] + cellPositions[i][1].toString()
          }]`
        );
        shipCell.setAttribute("data-ship", ships[ship].name);
      }
    }
    for (
      let x = cellPositions[0][0] - 1;
      x <= cellPositions[cellPositions.length - 1][0] + 1;
      x++
    ) {
      for (
        let y = cellPositions[0][1] - 1;
        y <= cellPositions[cellPositions.length - 1][1] + 1;
        y++
      ) {
        //and add the newly invalid positions to invalidPositions
        invalidPositions.push([x, y]);
      }
    }
  }

  function deployFleet(e) {
    console.log("1");
    e.target.disabled = "true";
    e.target.style.visibility = "hidden";
    shipsLeft = 3;
    invalidPositions = [];

    let gridElement = document.getElementsByClassName("square");

    for (let i = 0; i < gridElement.length; i++) {
      gridElement[i].setAttribute("data-bombed", "no");
      gridElement[i].setAttribute("data-sunk", "no");
      gridElement[i].setAttribute("data-ship", "no");
      gridElement[i].style.backgroundColor = "blue";
    }
    console.log("2");

    for (const ship in ships) {
      ships[ship].hitpoints = ships[ship].shipLength;
      ships[ship].cellPositions = [];
      console.log("3");
      while (ships[ship].cellPositions.length === 0) {
        let orientation = Math.floor(2 * Math.random())
          ? "vertical"
          : "horizontal";
        let row =
          orientation === "vertical"
            ? 1 + Math.floor((10 - ships[ship].shipLength) * Math.random())
            : 1 + Math.floor(10 * Math.random());
        let col =
          orientation === "vertical"
            ? Math.floor(10 * Math.random())
            : Math.floor((10 - ships[ship].shipLength) * Math.random());
        let cellPositions = [];

        for (let i = 0; i < ships[ship].hitpoints; i++) {
          cellPositions.push(
            orientation === "vertical" ? [col, row + i] : [col + i, row]
          );
        }
        console.log("4");
        checkPlacement(ship, cellPositions);
        console.log("5");
      }
    }
  }

  function sinkShip(activeShip) {
    for (let i = 0; i < ships[activeShip].cellPositions.length; i++) {
      let sunkCell = document.querySelector(
        `div.square[data-colrow= ${
          letters[ships[activeShip].cellPositions[i][0]] +
          ships[activeShip].cellPositions[i][1].toString()
        }]`
      );
      sunkCell.setAttribute("data-sunk", "yes");
    }
    shipsLeft--;
    if (shipsLeft === 0) {
      let gameOverButton = document.getElementById("gameOverButton");
      gameOverButton.style.visibility = "visible";
      gameOverButton.disabled = false;
    }
  }

  function handleClick(e) {
    if (e.target.getAttribute("data-bombed") === "no") {
      e.target.setAttribute("data-bombed", "yes");
      let activeShip = e.target.getAttribute("data-ship");
      if (activeShip !== "no") {
        ships[activeShip].hitpoints--;
        if (ships[activeShip].hitpoints === 0) {
          sinkShip(activeShip);
        }
      }
    }
  }

  return (
    <section className="grid" id="grid">
      {templateCells.map((cell) => (
        <div
          className="square"
          data-ship="no"
          data-target="no"
          data-bombed="no"
          data-sunk="no"
          data-colrow={cell.key}
          key={cell.key}
          onClick={handleClick}
        >
          <div className="squareContent"></div>
        </div>
      ))}
      <button className="deployButton" onClick={deployFleet}>
        Deploy Fleet
      </button>
      <button id="gameOverButton" onClick={deployFleet}>
        Game Over! Click to Restart
      </button>
    </section>
  );
}

export default Grid;
