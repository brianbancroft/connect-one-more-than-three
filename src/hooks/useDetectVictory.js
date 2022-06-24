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

  const _detectVictory = useEffect(() => {
    const {
      currentUser: color,
      column: columnIndex,
      row: rowIndex,
    } = lastPiecePlayed;

    if (rowIndex === null) return;

    const positionInBoard = ({ x, y }) => x >= 0 && x <= 6 && y >= 0 && y <= 5;

    const markerPresentAtPosition = ({ x, y, color }) =>
      positionInBoard({ x, y }) && boardStatus[y][x] === color;

    // i = row, j = column
    for (let y = rowIndex - 1; y <= rowIndex + 1; y++) {
      for (let x = columnIndex - 1; x <= columnIndex + 1; x++) {
        const notCurrentSpace = !(y === rowIndex && x === columnIndex);

        if (notCurrentSpace) {
          // If the token is the correct color, move a direction to the edge of the board until the count reaches 4
          if (
            markerPresentAtPosition({
              x,
              y,
              color,
            })
          ) {
            const xVector = x - columnIndex;
            const yVector = y - rowIndex;

            let newXPosition = x + xVector;
            let newYPosition = y + yVector;

            if (
              markerPresentAtPosition({
                x: newXPosition,
                y: newYPosition,
                color,
              })
            ) {
              newXPosition = x + 2 * xVector;
              newYPosition = y + 2 * yVector;

              if (
                markerPresentAtPosition({
                  x: newXPosition,
                  y: newYPosition,
                  color,
                })
              ) {
                setVictory(color);
              } else {
                newXPosition = x - 2 * xVector;
                newYPosition = y - 2 * yVector;

                if (
                  markerPresentAtPosition({
                    x: newXPosition,
                    y: newYPosition,
                    color,
                  })
                ) {
                  setVictory(color);
                }
              }
            } else {
              newXPosition = x - 2 * xVector;
              newYPosition = y - 2 * yVector;

              if (
                markerPresentAtPosition({
                  x: newXPosition,
                  y: newYPosition,
                  color,
                })
              ) {
                newXPosition = x - 3 * xVector;
                newYPosition = y - 3 * yVector;

                if (
                  markerPresentAtPosition({
                    x: newXPosition,
                    y: newYPosition,
                    color,
                  })
                ) {
                  setVictory(color);
                }
              }
            }
          }
        }
      }
    }
  }, [lastPiecePlayed, boardStatus]);

  return { victory, stalemate };
}

export default useDetectVictory;
