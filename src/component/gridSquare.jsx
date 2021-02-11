import React from "react";

class GridSquare extends React.Component {
  render() {
    return (
      <div
        className={this.props.baseClass + " " + this.props.contents}
        key={this.props.columnNumber + "" + this.props.rowNumber}
        onClick={this.props.onClick}
        rownumber={this.props.rowNumber}
        columnnumber={this.props.columnNumber}
      ></div>
    );
  }
}

export default GridSquare;
