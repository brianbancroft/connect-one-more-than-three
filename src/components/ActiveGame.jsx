import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import IndicatorActivePlayer from "./IndicatorActivePlayer";
import ButtonTriggerMove from "./ButtonTriggerMove";

import useDetectVictory from "../hooks/useDetectVictory";

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

  const [lastPiecePlayed, setLastPiecePlayed] = useState({
    row: null,
    column: null,
  });

  const { victory, stalemate } = useDetectVictory({
    boardStatus,
    lastPiecePlayed,
  });

  const handleColumnClick = (column) => () => {
    addPieceToColumn({ piece: currentUser, columnIndex: column });
    setPlayerOneActive(!playerOneActive);
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

  return (
    <div>
      <div className="grid grid-cols-7 px-2 gap-x-4 mb-2">
        <ButtonTriggerMove
          onClick={handleColumnClick(0)}
          disabled={victory || stalemate || determineColumnUnavailable(0)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(1)}
          disabled={victory || stalemate || determineColumnUnavailable(1)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(2)}
          disabled={victory || stalemate || determineColumnUnavailable(2)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(3)}
          disabled={victory || stalemate || determineColumnUnavailable(3)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(4)}
          disabled={victory || stalemate || determineColumnUnavailable(4)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(5)}
          disabled={victory || stalemate || determineColumnUnavailable(5)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(6)}
          disabled={victory || stalemate || determineColumnUnavailable(6)}
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
        {stalemate && !victory ? <div>stalemate</div> : <></>}
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
