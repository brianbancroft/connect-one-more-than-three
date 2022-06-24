import React, { useState } from "react";
import PropTypes from "prop-types";
import Board from "./Board";
import IndicatorActivePlayer from "./IndicatorActivePlayer";
import ButtonTriggerMove from "./ButtonTriggerMove";

function ActiveGame(props) {
  const { onGameEnd } = props;

  const blankRow = () => [null, null, null, null, null, null, null];

  const availableUsers = ["blue", "red"];

  const [currentUser, setCurrentUser] = useState(availableUsers[0]);
  const [boardStatus, setBoardStatus] = useState([
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
  ]);

  const handleColumnClick = (column) => () => {
    addPieceToColumn({ piece: currentUser, column });
  };

  const determineColumnAvailable = (columnIndex) => {
    alert("TODO");
  };

  const addPieceToColumn = ({ piece, column }) => {
    const reversedRows = [...boardStatus.reverse()];

    for (let i = 0; i < reversedRows.length; i++) {
      const row = reversedRows[i];

      if (!(row[column] === "red" || row[column] === "blue")) {
        reversedRows[i][column] = piece;
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
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(1)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(2)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(3)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(4)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(5)}
          currentColor={currentUser}
        />
        <ButtonTriggerMove
          onClick={handleColumnClick(6)}
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
