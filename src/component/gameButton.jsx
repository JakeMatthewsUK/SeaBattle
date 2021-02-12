import React from "react";

class GameButton extends React.Component {
  setButtonClass() {
    let className = "gameButton ";
    let buttonText = "";

    className += this.props.gameState === "initial" ? "initial " : "";
    buttonText += this.props.gameState === "initial" ? "Deploy Ships" : "";
    className += this.props.gameState === "inplay" ? "inplay " : "";
    className += this.props.gameState === "final" ? "final " : "";
    buttonText +=
      this.props.gameState === "final" ? "Game over. Click to play again." : "";

    return (
      <button className={className} onClick={this.props.handleButtonClick}>
        {buttonText}
      </button>
    );
  }

  render() {
    return <React.Fragment>{this.setButtonClass()}</React.Fragment>;
  }
}

export default GameButton;
