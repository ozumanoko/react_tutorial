import React from "react";
import { SquareView } from "./SquareView";

export class BoardView extends React.Component {
  #ROW_LENGTH;
  #COLUMN_LENGTH;

  constructor(props){
    super(props);
    const board = this.props.board;
    this.#COLUMN_LENGTH = board.ColumnLength;
    this.#ROW_LENGTH = board.RowLength;
  }

  #RenderSquare(squareNumber) {
    const board = this.props.board;
    const squareStatus = board.SquareStatus(squareNumber);
    return (
      <SquareView
        key={squareNumber}
        value={squareStatus}
        onClick={() => this.props.onClick(squareNumber)}
      />
    );
  }

  #RenderColumn(colunmNumber){
    return (
      <div className="board-row" key={colunmNumber}>
        {
          Array(this.#ROW_LENGTH).fill(0).map((_, rowNumber) => {
            return this.#RenderSquare(colunmNumber * 3 + rowNumber)
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          Array(this.#COLUMN_LENGTH).fill(0).map((_, columnNumber) => {
            return this.#RenderColumn(columnNumber);
          })
        }
      </div>
    );
  }
}
