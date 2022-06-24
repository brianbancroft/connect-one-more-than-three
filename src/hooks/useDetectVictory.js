import { useEffect, useState } from "react";

function useDetectVictory({ boardStatus, lastPiecePlayed }) {
  const [stalemate, setStalemate] = useState(false);
  const [victory, setVictory] = useState("");

  const _detectStalemate = useEffect(() => {
    const activePiecesSet = new Set(boardStatus.flat());

    if (
      activePiecesSet.size === 2 &&
      activePiecesSet.has("blue") &&
      activePiecesSet.has("red")
    ) {
      setStalemate(true);
    }
  }, [boardStatus]);

  const _hasPlayerWon = useEffect(() => {
    const {
      currentUser: color,
      column: columnIndex,
      row: rowIndex,
    } = lastPiecePlayed;

    if (rowIndex === null) return;

    const positionInBoard = ({ x, y }) => x >= 0 && x <= 6 && y >= 0 && y <= 5;

    // i = row, j = column
    for (let y = rowIndex - 1; y <= rowIndex + 1; y++) {
      for (let x = columnIndex - 1; x <= columnIndex + 1; x++) {
        const notCurrentSpace = !(y === rowIndex && x === columnIndex);

        if (positionInBoard({ x, y }) && notCurrentSpace) {
          let count = 1;
          // If the token is the correct color, move a direction to the edge of the board until the count reaches 4
          if (boardStatus[y][x] === color) {
            console.log("Adjancy of one detected");
            count++;

            const xVector = x - columnIndex;
            const yVector = y - rowIndex;

            let newXPosition = x + xVector;
            let newYPosition = y + yVector;

            if (
              positionInBoard({ x: newXPosition, y: newYPosition }) &&
              boardStatus[newYPosition][newXPosition] === color
            ) {
              count++;
              console.log("Adjacency of two detected");
            } else {
              console.log("No adajency of two; detecting other direction");
              newXPosition = x - 2 * xVector;
              newYPosition = y - 2 * yVector;

              if (
                positionInBoard({ x: newXPosition, y: newYPosition }) &&
                boardStatus[newYPosition][newXPosition] === color
              ) {
                console.log("Reversed course adjancy of two detected");
              }
            }
          }
        }
      }
    }

    console.log("Last piece ", color, rowIndex, columnIndex);
  }, [lastPiecePlayed]);

  return { victory, stalemate };
}

export default useDetectVictory;
