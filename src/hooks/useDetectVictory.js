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
    } else {
      setStalemate(false);
    }
  }, [boardStatus]);

  const _detectVictory = useEffect(() => {
    const {
      currentUser: color,
      column: columnIndex,
      row: rowIndex,
    } = lastPiecePlayed;

    // Ensures victory is reset on first trigger
    if (rowIndex === null) setVictory("");

    const positionInBoard = ({ x, y }) => x >= 0 && x <= 6 && y >= 0 && y <= 5;

    const markerPresentAtPosition = ({ x, y, color }) =>
      positionInBoard({ x, y }) && boardStatus[y][x] === color;

    /**
     * Partially-applied function that checks position
     *
     * @date 2022-06-24
     * @param {Integer} x the current column position of the sweeping loop
     * @param {Integer} y the current row position of the sweeping loop
     * @param {Integer} dx the difference between the current column position of the sweeping index and the initial position given dt = 1
     * @param {Integer} dy the difference between the current row position of the sweeping index and the initial position given dt = 1
     * @param {Integer} t treats position of the marker as a parametric function where (x,y) = f(t)
     * @param {String} color the current player. trying to keep it to 'red' or 'blue'...
     * @returns {Boolean} Is colored marker present
     */
    const checkMarkerPresent =
      ({ x, y, color, dx, dy }) =>
      (t) =>
        markerPresentAtPosition({ x: x + t * dx, y: y + t * dy, color });

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
            const markerPresentAtTime = checkMarkerPresent({
              x,
              dx: x - columnIndex,
              y,
              dy: y - rowIndex,
              color,
            });

            if (
              (markerPresentAtTime(1) && markerPresentAtTime(2)) ||
              (markerPresentAtTime(1) &&
                markerPresentAtTime(-1) &&
                markerPresentAtTime(-2))
            ) {
              setVictory(color);
            }
          }
        }
      }
    }
  }, [lastPiecePlayed, boardStatus]);

  const _reset = useEffect(
    () => () => {
      setStalemate(false);
      setVictory("");
    },
    []
  );

  return { victory, stalemate };
}

export default useDetectVictory;
