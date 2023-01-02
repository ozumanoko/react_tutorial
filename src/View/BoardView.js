import React from "react";
import { SquareView } from "./SquareView";
import { GameStatusView } from "./GameStatusView";
import { Board } from "../ValueObject/Board";

export class BoardView extends React.Component {
  #gameStatusView;

  constructor(props) {
    super(props);

    this.#gameStatusView = new GameStatusView();

    const board = new Board(Array(9).fill(null));
    this.state = {
      board: board,
      xIsNext: true,
    }
  }

  handleClick(squareNumber) {
    const nowBoard = this.state.board;
    if (nowBoard.Winner() || nowBoard.SquareStatus(squareNumber)) {
      return;
    }

    // TODO: squareクラスを作成してそこに移動したほうが良いかも
    const character = this.#gameStatusView.TurnCharacter(this.state.xIsNext);
    const nextBoard = nowBoard.SetSquareStatus(squareNumber, character);

    this.setState({
      board: nextBoard,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(squareNumber) {
    return (
      <SquareView
        value={this.state.board.SquareStatus(squareNumber)}
        onClick={() => this.handleClick(squareNumber)}
      />
    );
  }

  render() {
    const winner = this.state.board.Winner();
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
