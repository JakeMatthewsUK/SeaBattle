import React from "react";

class Square extends React.Component {
  render() {
    return (
      <div
        className={this.props.className}
        id={this.props.id}
        onClick={this.props.handleClick}
      ></div>
    );
  }
}

export default Square;
