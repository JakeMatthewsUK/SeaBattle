import React from "react";

class GameBoard extends React.Component {
  gameGrid() {
    //newGrid is an array created by mapping the attributes of gridArray into individual divs to be rendered
    //the classnames are first modified for differential css styling - an example resulting class attribute is: 'square battleship bombed'

    const newGrid = this.props.gridArray.map((cell) => {
      let className = "square";
      className += cell.ship ? " ship" : "";
      className += cell.sunk ? " sunk" : "";
      className += cell.bombed ? " bombed" : "";

      //the index of the cell is then used to generate a string to label the div (eg 'A1')
      let cellLabel = "";
      if (!cell.bombed) {
        cellLabel = String.fromCharCode(65 + Math.floor(cell.cellIndex / 10));
        let cellIndexString = (cell.cellIndex + 1).toString();
        let numberPart = cellIndexString.slice(-1);
        if (numberPart === "0") {
          numberPart = "10";
        }
        cellLabel += numberPart;
      }
      return (
        <div
          id={cell.cellIndex}
          className={className}
          onClick={this.props.handleClick}
          key={cell.cellIndex}
        >
          {cellLabel}
        </div>
      );
    });

    return newGrid;
  }
  render() {
    return (
      <section className="grid" id="grid">
        {this.gameGrid()}
      </section>
    );
  }
}

export default GameBoard;
