import React from "react";
import Square from "./square";

class GameBoard extends React.Component {
  gameGrid() {
    const newGrid = this.props.gridArray.map((cell) => {
      let className = "square";
      className += cell.ship ? " ship" : "";
      className += cell.sunk ? " sunk" : "";
      className += cell.bombed ? " bombed" : "";
      return (
        <Square
          id={cell.cellNumber}
          className={className}
          handleClick={this.props.handleClick}
          key={cell.cellNumber}
        />
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
