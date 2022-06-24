import React, { useState } from "react";
import PropTypes from "prop-types";
import Board from "./Board";

function ActiveGame(props) {
  const { onGameEnd } = props;

  const blankRow = () => [null, null, null, null, null, null, null];

  const [boardStatus, setBoardStatus] = useState([
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
    blankRow(),
  ]);

  return (
    <div>
      <Board boardStatus={boardStatus} />
      <br />

      <button onClick={onGameEnd}>Zeroize?</button>
    </div>
  );
}

ActiveGame.propTypes = {
  /** Action that takes place on game end */
  onGameEnd: PropTypes.func.isRequired,
};

export default ActiveGame;
