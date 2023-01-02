import React from "react";
import { Square } from "./Square";
import { GameStatusView } from "./GameStatusView";
import { GameRules } from "./GameRules";

export class Board extends React.Component {
  #gameStatusView;
  #gameRules;

  constructor(props) {
    super(props);

    this.#gameStatusView = new GameStatusView();
    this.#gameRules = new GameRules();

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(squareNumber) {
    const squares = this.state.squares.slice();

    if (this.#gameRules.calculateWinner(squares) || squares[squareNumber]) {
      return;
    }

    squares[squareNumber] = this.#gameStatusView.TurnCharacter(this.state.xIsNext);
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(squareNumber) {
    return (
      <Square
        value={this.state.squares[squareNumber]}
        onClick={() => this.handleClick(squareNumber)}
      />
    );
  }

  render() {
    const winner = this.#gameRules.calculateWinner(this.state.squares);
    const status = this.#gameStatusView.StatusText(winner, this.state.xIsNext);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
