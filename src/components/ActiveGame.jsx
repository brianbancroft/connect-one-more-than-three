import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import IndicatorActivePlayer from "./IndicatorActivePlayer";
import ButtonTriggerMove from "./ButtonTriggerMove";

const activeStalemate = (board) => {
  const activePiecesSet = new Set(board.flat());

  return (
    activePiecesSet.size === 2 &&
    activePiecesSet.has("blue") &&
    activePiecesSet.has("red")
  );
};
function ActiveGame(props) {
  const { onGameEnd } = props;

  const blankRow = () => [null, null, null, null, null, null, null];

  const availableUsers = ["blue", "red"];

  const [playerOneActive, setPlayerOneActive] = useState(true);
  const currentUser = playerOneActive ? availableUsers[0] : availableUsers[1];

  const [boardStatus, setBoardStatus] = useState([
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
  ]);
  const [stalemate, setStalemate] = useState(false);
  const [victory, setVictory] = useState("");

  const [lastPiecePlayed, setLastPiecePlayed] = useState({
    row: null,
    column: null,
  });

  const handleColumnClick = (column) => () => {
    addPieceToColumn({ piece: currentUser, columnIndex: column });
    setPlayerOneActive(!playerOneActive);

    if (activeStalemate(boardStatus)) setStalemate(true);
  };

  const determineColumnUnavailable = (columnIndex) => {
    for (let i = 0; i < boardStatus.length; i++) {
      const row = boardStatus[i];
      if (row[columnIndex] === null) return false;
    }
    return true;
  };

  const addPieceToColumn = ({ piece, columnIndex }) => {
    const newBoard = [...boardStatus];
    const reversedRows = newBoard.reverse();

    for (let i = 0; i < reversedRows.length; i++) {
      const row = reversedRows[i];

      if (!(row[columnIndex] === "red" || row[columnIndex] === "blue")) {
        reversedRows[i][columnIndex] = piece;
        setLastPiecePlayed({
          row: 6 - 1 - i,
          column: columnIndex,
          currentUser,
        });
        setBoardStatus(reversedRows.reverse());

        break;
      }
    }
  };

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
            count++;

            const xVector = x - columnIndex;
            const yVector = y - rowIndex;

            const newXPosition = x + xVector;
            const newYPosition = y + yVector;

            if (
              positionInBoard({ x: newXPosition, y: newYPosition }) &&
              boardStatus[newYPosition][newXPosition] === color
            ) {
              count++;
              console.log("Adjacency of two detected");
            }
          }
        }
      }
    }

    console.log("Last piece ", color, rowIndex, columnIndex);
  }, [lastPiecePlayed]);

  return (
    <div>
      <div className="grid grid-cols-7 px-2 gap-x-4 mb-2">
        <ButtonTriggerMove
          onClick={handleColumnClick(0)}
          disabled={determineColumnUnavailable(0)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(1)}
          disabled={determineColumnUnavailable(1)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(2)}
          disabled={determineColumnUnavailable(2)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(3)}
          disabled={determineColumnUnavailable(3)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(4)}
          disabled={determineColumnUnavailable(4)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(5)}
          disabled={determineColumnUnavailable(5)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(6)}
          disabled={determineColumnUnavailable(6)}
          currentColor={currentUser}
        />
      </div>

      <Board boardStatus={boardStatus} />
      <br />

      <section className="">
        <div className="flex justify-between w-full">
          <IndicatorActivePlayer
            playerName="Player 1"
            color={availableUsers[0]}
            active={availableUsers[0] === currentUser}
          />

          <IndicatorActivePlayer
            playerName="Player 2"
            color={availableUsers[1]}
            active={availableUsers[1] === currentUser}
          />
        </div>
        {stalemate ? <div>stalemate</div> : <></>}
        {victory ? <div>victory by {victory}</div> : <></>}
        <div className="capitalize flex w-full justify-center pt-12">
          <button
            onClick={onGameEnd}
            className="bg-slate-200 text-slate-600 italic p-4 border border-slate-300 rounded"
          >
            end game
          </button>
        </div>
      </section>
    </div>
  );
}

ActiveGame.propTypes = {
  /** Action that takes place on game end */
  onGameEnd: PropTypes.func.isRequired,
};

export default ActiveGame;
