import React from "react";

class Input extends React.Component {
  constructor() {
    super();
    this.handleKeyPess = this.handleKeyPess.bind(this);
  }

  handleKeyPess(e) {
    if (e.code === "Enter" || e.key === "Enter") {
      let value = e.target.value;
      e.target.value = ""; //reset the input field
      let row = "";
      let col = null;

      for (let i = 0; i < value.length; i++) {
        let character = value[i];
        let charCode = character.charCodeAt(0); //convert to unicode integer
        if (charCode >= 65 && charCode <= 75) {
          col = charCode - 65; //use number inputs to update col variable
        } else if (charCode >= 97 && charCode <= 107) {
          col = charCode - 97;
        } else if (charCode >= 48 && charCode <= 57) {
          row += charCode - 48; //use letter inputs to update row variable
        }
      }
      if (row !== "" && col !== null) {
        row = parseInt(row); //where both a letter and a number have been input, parse the row variable to an int and subtract one (zero base)
        row--;
        if (row < 10 && row >= 0) {
          if (col < 10 && col >= 0) {
            let target = col * 10 + row; //where (0<= row,col <10), a valid input between A1 and J10 has been detected -> programmatically click on the
            document.getElementById(target).click(); //...appropriate div so that App.state is modified by its handleClick function
          }
        }
      }
    } else if (e.target.value.length > 2) {
      e.target.value = ""; //where the input is getting too large, reset it
    }
  }

  render() {
    return (
      <div className="input">
        <h2>Choose a cell:</h2>
        <input
          className="inputArea"
          type="text"
          placeholder="eg 'A1'"
          onKeyPress={this.handleKeyPess}
        />
      </div>
    );
  }
}

export default Input;
