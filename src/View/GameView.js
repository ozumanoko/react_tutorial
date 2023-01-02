import React from "react";
import { BoardView } from "./BoardView";
import { BoardHistory } from "../ValueObject/BoardHistory";
import { GameStatusView } from "./GameStatusView";

export class GameView extends React.Component {
  #gameStatusView;

  constructor(props) {
    super(props);

    this.#gameStatusView = new GameStatusView();

    const boardHistory = BoardHistory.New();
    this.state = {
      history: boardHistory,
      xIsNext: true,
    };
  }

  handleClick(squareNumber) {
    const history = this.state.history;
    const latestBoard = history.Latest().board;
    if (latestBoard.Winner() || latestBoard.SquareStatus(squareNumber)) {
      return;
    }

    // TODO: squareクラスを作成してそこに移動したほうが良いかも
    const character = this.#gameStatusView.TurnCharacter(this.state.xIsNext);
    const nextBoard = latestBoard.SetSquareStatus(squareNumber, character);
    const newHistory = history.Add(nextBoard);

    this.setState({
      history: newHistory,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const latestBoard = history.Latest().board;
    const winner = latestBoard.Winner();
    const status = this.#gameStatusView.StatusText(winner, this.state.xIsNext);

    return (
      <div className="game">
        <div className="game-board">
          <BoardView
            board={latestBoard}
            onClick={(squareNumber) => { this.handleClick(squareNumber) }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
