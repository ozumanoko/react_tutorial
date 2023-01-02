import React from "react";
import { SquareView } from "./SquareView";

export class BoardView extends React.Component {
  renderSquare(squareNumber) {
    const board = this.props.board;
    const squareStatus = board.SquareStatus(squareNumber);
    return (
      <SquareView
        value={squareStatus}
        onClick={() => this.props.onClick(squareNumber)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status"></div>
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
