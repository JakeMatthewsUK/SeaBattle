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
      return (
        <div
          id={cell.cellNumber}
          className={className}
          onClick={this.props.handleClick}
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
