export class Board {
    #squares;

    /**
     * コンストラクタ
     * @param {array} squares 
     */
    constructor(squares) {
        if (squares.length !== 9) {
            throw new Error("ボードのマス目の数が想定と異なります");
        }

        this.#squares = squares;
    }

    SetSquareStatus(squareNumber, character) {
        const squares = this.#squares.slice();
        squares[squareNumber] = character;

        return new Board(squares);
    }

    SquareStatus(squareNumber) {
        return this.#squares[squareNumber]
    }

    Winner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (this.#squares[a] != null && this.#squares[a] === this.#squares[b] && this.#squares[a] === this.#squares[c]) {
                return this.#squares[a];
            }
        }
        return null;
    }
}