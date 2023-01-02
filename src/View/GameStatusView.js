export class GameStatusView {
    TurnCharacter(xIsNext) {
        return xIsNext ? "X" : "O";
    }

    #NextPlayerText(xIsNext) {
        return "Next player: " + this.TurnCharacter(xIsNext);
    }

    #WinnerText(winner) {
        return "Winner: " + winner;
    }

    StatusText(winner, xIsNext) {
        if (winner) {
            const winnerText = this.#WinnerText(winner);
            return winnerText;
        }

        const nextPlayerText = this.#NextPlayerText(xIsNext);
        return nextPlayerText;
    }
}