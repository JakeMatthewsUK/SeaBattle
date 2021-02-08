import Input from "./input.jsx";

function Grid(props) {
  const templateCells = [];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ships = {
    battleship: {
      length: 5,
      cellPositions: [],
      hitpoints: 5,
      sunk: false,
    },
    destroyer1: {
      length: 4,
      cellPositions: [],
      hitpoints: 4,
      sunk: false,
    },
    destroyer2: {
      length: 4,
      cellPositions: [],
      hitpoints: 4,
      sunk: false,
    },
  };
  let invalidPositions = [];

  for (let numberPos = 0; numberPos < 10; numberPos++) {
    for (let letterPos = 0; letterPos < 10; letterPos++) {
      let nextCell = {
        column: letters[letterPos],
        row: numbers[numberPos],
        baseClass: "square",
        key: letters[letterPos] + numbers[numberPos],
        sunk: false,
        name: "empty",
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
        document.querySelector(
          `div.square[data-colrow= ${
            letters[cellPositions[i][0]] + cellPositions[i][1].toString()
          }]`
        ).style.backgroundColor = "yellow";
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
    e.target.disabled = "true";
    e.target.style.visibility = "hidden";
    for (const ship in ships) {
      while (ships[ship].cellPositions.length === 0) {
        let orientation = Math.floor(2 * Math.random())
          ? "vertical"
          : "horizontal";
        let row =
          orientation === "vertical"
            ? 1 + Math.floor((10 - ships[ship].length) * Math.random())
            : 1 + Math.floor(10 * Math.random());
        let col =
          orientation === "vertical"
            ? Math.floor(10 * Math.random())
            : Math.floor((10 - ships[ship].length) * Math.random());
        let cellPositions = [];

        for (let i = 0; i < ships[ship].length; i++) {
          cellPositions.push(
            orientation === "vertical" ? [col, row + i] : [col + i, row]
          );
        }
        checkPlacement(ship, cellPositions);
      }
    }
  }

  function handleClick() {
    console.log("click detected");
    let cells = document.getElementsByName("empty");

    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "grey";
    }
  }

  return (
    <section className="grid" id="grid">
      {templateCells.map((cell) => (
        <div
          data-column={cell.column}
          data-row={cell.row}
          data-colrow={cell.key}
          className={cell.baseClass}
          key={cell.key}
          name={cell.name}
          onClick={handleClick}
          data-ship="none"
        >
          <div className="squareContent"></div>
        </div>
      ))}
      <button className="deployButton" onClick={deployFleet}>
        Deploy Fleet
      </button>
    </section>
  );
}

export default Grid;
