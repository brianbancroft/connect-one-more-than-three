import React from "react";
import PropTypes from "prop-types";

import Token from "./Token";

function Board(props) {
  const { boardStatus } = props;

  const boardSpaces = boardStatus
    .flat()
    .map((token, index) => (
      <Token key={index} blue={token === "blue"} red={token === "red"} />
    ));

  return (
    <>
      <section
        className="bg-yellow-200 py-4 px-2 grid grid-cols-7 grid-rows-6 gap-4 items-center justify-items-center border border-black"
        id="gameBoard"
      >
        {boardSpaces}
      </section>
      <div className="flex justify-between">
        <div className="bg-yellow-200 w-10 h-6 border-b-4 border-b-gray-500 border-x border-black ml-8">
          <div className="hidden">left foot</div>
        </div>
        <div className="bg-yellow-200 w-10 h-6 border-b-4 border-b-gray-500 border-x border-black mr-8">
          <div className="hidden">right foot</div>
        </div>
      </div>
    </>
  );
}

Board.propTypes = {
  boardStatus: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any]))
  ).isRequired,
};

export default Board;
