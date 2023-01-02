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
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(squareNumber) {
    const latestHistory = this.state.history;
    const rewindHistory = latestHistory.Rewind(this.state.stepNumber);
    const latestBoard = rewindHistory.LatestBoard().board;
    if (latestBoard.Winner() || latestBoard.SquareStatus(squareNumber)) {
      return;
    }

    const character = this.#gameStatusView.TurnCharacter(this.state.xIsNext);
    const nextBoard = latestBoard.SetSquareStatus(squareNumber, character);
    const newHistory = rewindHistory.Add(nextBoard);

    this.setState({
      history: newHistory,
      stepNumber: newHistory.Length() - 1,
      xIsNext: !this.state.xIsNext,
    });
  }

  JumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  /**
   * 
   * @param {BoardHistory} history 
   * @returns 
   */
  #Moves(history) {
    const moves = history.value.map((step, move) => {
      const desc = move !== 0 ?
        `Go to move # ${move}` :
        'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.JumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return moves;
  }

  render() {
    const history = this.state.history;

    const latestBoard = history.BoardSnapShot(this.state.stepNumber).board;
    const winner = latestBoard.Winner();
    const status = this.#gameStatusView.StatusText(winner, this.state.xIsNext);

    const moves = this.#Moves(history);

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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
