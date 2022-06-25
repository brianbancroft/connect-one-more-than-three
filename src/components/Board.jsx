import React from "react";
import PropTypes from "prop-types";

function Board(props) {
  const { boardStatus } = props;

  const BlueToken = () => (
    <div className="rounded-full bg-blue-600 w-12 h-12 border border-black" />
  );
  const RedToken = () => (
    <div className="rounded-full bg-red-600 w-12 h-12 border border-black" />
  );

  const boardSpaces = boardStatus.flat().map((token, index) => {
    if (token === "blue")
      return (
        <div
          className="bg-yellow-200 p-2 h-full flex justify-center"
          key={index}
        >
          <BlueToken />
        </div>
      );

    if (token === "red")
      return (
        <div
          className="bg-yellow-200 p-2 h-full flex justify-center"
          key={index}
        >
          <RedToken />
        </div>
      );

    return (
      <div className=" p-2 h-14 w-14 bg-yellow-200" key={index}>
        <div className="bg-white w-12 h-12 rounded-full border border-black" />
      </div>
    );
  });

  return (
    <>
      <section className="bg-yellow-200 p-4 grid grid-cols-7 grid-rows-6 gap-4 items-center justify-center border border-black">
        {boardSpaces}
      </section>
      <div className="flex justify-between">
        <div className="bg-yellow-200 w-10 h-6 border-b border-x border-black ml-8"></div>
        <div className="bg-yellow-200 w-10 h-6 border-b border-x border-black mr-8"></div>
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
