import React from "react";
import { BoardView } from "./BoardView";

export class GameView extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <BoardView />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
