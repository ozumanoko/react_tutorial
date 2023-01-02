import { Board } from "./Board";

export class BoardHistory {
    #history;

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
            board: board
        }];
        const history = new BoardHistory(historyArray);

        return history;
    }

    Latest() {
        const board = this.#history.slice(-1);
        return board[0];
    }

    /**
     * 追加
     * @param {Board} board 
     */
    Add(board) {
        const history = this.#history.slice();
        history.push(
            { board: board }
        );

        return new BoardHistory(history);
    }
}