import React from "react";
import PropTypes from "prop-types";

function Board(props) {
  const { boardStatus } = props;

  const BlueToken = () => (
    <div className="rounded-full bg-blue-600 w-10 h-10" />
  );
  const RedToken = () => <div className="rounded-full bg-red-600 w-10 h-10" />;

  const boardSpaces = boardStatus.flat().map((token, index) => {
    if (token === "blue")
      return (
        <div className="bg-white p-2 h-full flex justify-center" key={index}>
          <BlueToken />
        </div>
      );

    if (token === "red")
      return (
        <div className="bg-white p-2 h-full flex justify-center" key={index}>
          <RedToken />
        </div>
      );

    return <div className="bg-white p-2 h-14 w-14" key={index} />;
  });

  return (
    <section className="bg-slate-200 p-4 grid grid-cols-7 grid-rows-6 gap-4 items-center justify-center border border-black">
      {boardSpaces}
    </section>
  );
}

Board.propTypes = {
  boardStatus: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any]))
  ).isRequired,
};

export default Board;
