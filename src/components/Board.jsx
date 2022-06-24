import React from "react";
import PropTypes from "prop-types";

/** Read-only: It's the board */
function Board(props) {
  const { boardStatus } = props;

  return <div>Board</div>;
}

Board.propTypes = {
  boardStatus: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any]))
  ).isRequired,
};

export default Board;
