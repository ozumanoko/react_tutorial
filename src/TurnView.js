export class TurnView {
    TurnCharacter(xIsNext) {
        return xIsNext ? "X" : "O";
    }

    StatusText(xIsNext) {
        return "Next player: " + this.TurnCharacter(xIsNext);
    }
}