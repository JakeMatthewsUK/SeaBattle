import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPess = this.handleKeyPess.bind(this);
  }

  handleKeyPess(e) {
    if (e.code === "Enter" || e.key === "Enter") {
      let value = e.target.value;
      e.target.value = "";
      let row = "";
      let col = null;

      for (let i = 0; i < value.length; i++) {
        let letter = value[i];
        let charCode = letter.charCodeAt(0);
        if (charCode >= 65 && charCode <= 75) {
          col = charCode - 65;
        } else if (charCode >= 97 && charCode <= 107) {
          col = charCode - 97;
        } else if (charCode >= 48 && charCode <= 57) {
          row += charCode - 48;
        }
      }
      if (row !== "" && col !== null) {
        row = parseInt(row);
        row--;
        if (row < 10 && row >= 0) {
          if (col < 10 && col >= 0) {
            let target = row * 10 + col;
            if (this.props.gameState === "inplay") {
              document.getElementById(target).click();
            }
          }
        }
      }
    } else if (e.target.value.length > 2) {
      e.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <h1 className="input">Input Area</h1>
        <input
          className="inputArea"
          type="text"
          placeholder="Choose a cell eg 'A1'"
          onKeyPress={this.handleKeyPess}
        />
      </div>
    );
  }
}

export default Input;
