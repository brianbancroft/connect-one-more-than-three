import React, { useReducer } from "react";
import PropTypes from "prop-types";

import Board from "./Board";
import ButtonTriggerMove from "./ButtonTriggerMove";
import IndicatorActivePlayer from "./IndicatorActivePlayer";
import useDetectVictory from "../hooks/useDetectVictory";

const blankRow = () => [null, null, null, null, null, null, null];
const initialState = {
  boardStatus: Array.from(Array(6)).map(blankRow),
  playerOneActive: true,
  lastPiecePlayed: {
    row: null,
    column: null,
    currentUser: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "update-board":
      return {
        boardStatus: action.boardStatus,
        playerOneActive: !state.playerOneActive,
        lastPiecePlayed: action.lastPiecePlayed,
      };

    default:
      console.log("Unknwon case ", action.type);
  }
}

function ActiveGame(props) {
  const { onGameEnd } = props;

  const availableUsers = ["blue", "red"];
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentUser = state.playerOneActive
    ? availableUsers[0]
    : availableUsers[1];

  const { boardStatus, lastPiecePlayed } = state;

  const { victory, stalemate } = useDetectVictory({
    boardStatus,
    lastPiecePlayed,
  });

  const executeTurn = ({ boardStatus, lastPiecePlayed }) =>
    dispatch({ boardStatus, lastPiecePlayed, type: "update-board" });

  const handleColumnClick = (columnIndex) => () => {
    const newBoard = [...boardStatus];
    const reversedRows = newBoard.reverse();

    for (let i = 0; i < reversedRows.length; i++) {
      const row = reversedRows[i];

      if (!(row[columnIndex] === "red" || row[columnIndex] === "blue")) {
        reversedRows[i][columnIndex] = currentUser;

        executeTurn({
          boardStatus: reversedRows.reverse(),
          lastPiecePlayed: {
            row: 6 - 1 - i,
            column: columnIndex,
            currentUser,
          },
        });

        break;
      }
    }
  };

  const determineColumnUnavailable = (columnIndex) => {
    for (let i = 0; i < boardStatus.length; i++) {
      const row = boardStatus[i];
      if (row[columnIndex] === null) return false;
    }
    return true;
  };

  return (
    <div>
      <div className="grid grid-cols-7 px-2 gap-x-4 mb-2">
        {Array.from(Array(7)).map((_, index) => (
          <ButtonTriggerMove
            key={`trigger-move-${index}`}
            onClick={handleColumnClick(index)}
            disabled={victory || stalemate || determineColumnUnavailable(index)}
            currentColor={currentUser}
          />
        ))}
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
