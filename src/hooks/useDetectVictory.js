import { useEffect, useState } from 'react'

function useDetectVictory({ boardStatus, lastPiecePlayed }) {
  const [stalemate, setStalemate] = useState(false)
  const [victory, setVictory] = useState('')

  /**
   * Converts the flattened array of the board to a set. If all moves have been expended, there should only be elements "red" and "blue"
   *  */
  const _detectStalemate = useEffect(() => {
    const activePiecesSet = new Set(boardStatus.flat())

    if (
      activePiecesSet.size === 2 &&
      activePiecesSet.has('blue') &&
      activePiecesSet.has('red')
    ) {
      setStalemate(true)
    } else {
      setStalemate(false)
    }
  }, [boardStatus])

  /**
   * Searches around the set piece through two for loops. If a piece is found, determines
   * the vector and creates a parametric form equation to determine if there are four adjancent tokens of a color
   */
  const _detectVictory = useEffect(() => {
    const {
      currentUser: color,
      column: columnIndex,
      row: rowIndex,
    } = lastPiecePlayed

    const positionInBoard = ({ x, y }) => x >= 0 && x <= 6 && y >= 0 && y <= 5

    const markerPresentAtPosition = ({ x, y, color }) =>
      positionInBoard({ x, y }) && boardStatus[y][x] === color

    const checkMarkerPresent =
      ({ x, y, color, dx, dy }) =>
      (t) =>
        markerPresentAtPosition({ x: x + t * dx, y: y + t * dy, color })

    for (let y = rowIndex - 1; y <= rowIndex + 1; y++) {
      for (let x = columnIndex - 1; x <= columnIndex + 1; x++) {
        const notCurrentSpace = !(y === rowIndex && x === columnIndex)

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
            })

            /**
             *
             *    x2  0   0   0   0   0
             *    0   x1  0   0   0   0
             *    0   0   x0  0   0   0
             *    0   0   0   xi  0   0
             *    0   0   0   0   0   0
             *    0   0   0   0   0   0
             *    xTurn (xi) => xSearch (xo) => x1 => x2
             */
            const caseForward = markerPresentAtTime(1) && markerPresentAtTime(2)

            /**
             *
             *    0   0   0   0   0    0
             *    0   0   0   0   0    0
             *    0   0   x0  0   0    0
             *    0   0   0   xi  0    0
             *    0   0   0   0   x-2  0
             *    0   0   0   0   0    x-3
             *    xTurn (xi) => xSearch (x0) => x-2 => x-3
             */
            const caseReverse1 =
              markerPresentAtTime(-2) && markerPresentAtTime(-3)

            /**
             *
             *    0   0   0   0   0    0
             *    0   x1  0   0   0    0
             *    0   0   x0  0   0    0
             *    0   0   0   xi  0    0
             *    0   0   0   0   x-2  0
             *    0   0   0   0   0    0
             *    xTurn (xi) => xSearch (x0) => x1 => x-2
             */
            const caseReverse2 =
              markerPresentAtTime(1) && markerPresentAtTime(-2)

            if (caseForward || caseReverse1 || caseReverse2) {
              setVictory(color)
            }
          }
        }
      }
    }
  }, [lastPiecePlayed, boardStatus])

  const _reset = useEffect(
    () => () => {
      setStalemate(false)
      setVictory('')
    },
    [],
  )

  return { victory, stalemate }
}

export default useDetectVictory
