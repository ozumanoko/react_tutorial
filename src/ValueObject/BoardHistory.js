import { Board } from "./Board";

export class BoardHistory {
    #history;

    get value() {
        return this.#history.slice();
    }

    /**
     * コンストラクタ
     * @param {Array} history 
     */
    constructor(history) {
        this.#history = history;
    }

    static New() {
        const board = Board.New();
        const historyArray = [{
            board: board,
            latestSquare: {
                row: -1,
                column: -1,
            },
        }];
        const history = new BoardHistory(historyArray);

        return history;
    }

    Length() {
        return this.#history.length;
    }

    Rewind(stepNumber) {
        const historyArray = this.#history.slice(0, stepNumber + 1);
        return new BoardHistory(historyArray);
    }

    BoardSnapShot(stepNumber) {
        const history = this.#history.slice();
        const board = history[stepNumber];
        return board;
    }

    LatestBoard() {
        const history = this.#history.slice(-1);
        return history[0];
    }

    /**
     * 追加
     * @param {Board} board 
     */
    Add(board, squareNumber) {
        const history = this.#history.slice();
        history.push(
            { 
                board: board,
                latestSquare: {
                    row: board.Row(squareNumber),
                    column: board.Column(squareNumber),
                },
            }
        );

        return new BoardHistory(history);
    }
}