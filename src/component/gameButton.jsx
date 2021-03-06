import React from "react";

class GameButton extends React.Component {
  setButtonClass() {
    let className = "gameButton "; //the className always contains 'gameButton', but will have additional strings added below based on App.state
    let buttonText = "";

    className += this.props.gameState === "initial" ? "initial " : ""; //css styles .gameButton .initial to visible
    buttonText += this.props.gameState === "initial" ? "Deploy Ships" : ""; //...with the text saying 'Deploy Ships'
    className += this.props.gameState === "inplay" ? "inplay " : ""; //midgame, the css sets .gameButton .inplay to invisible
    className += this.props.gameState === "final" ? "final " : ""; //whilst at the end of the game it is visible again
    buttonText +=
      this.props.gameState === "final" ? "Game over. Click to play again." : ""; //...but with the text changed to state 'Game over...'
    return (
      <button className={className} onClick={this.props.handleBigButtonClick}>
        {buttonText}
      </button>
    );
  }

  render() {
    return <React.Fragment>{this.setButtonClass()}</React.Fragment>; //return the button with className and text updated by setButtonClass()
  }
}

export default GameButton;
