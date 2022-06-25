import React from "react";
import PropTypes from "prop-types";

function Token(props) {
  if (blue)
    return (
      <div className="rounded-full bg-blue-600 w-12 h-12 border border-black">
        <div className="hidden">token-blue</div>
      </div>
    );

  if (red)
    return (
      <div className="rounded-full bg-red-600 w-12 h-12 border border-black">
        <div className="hidden">token-red</div>
      </div>
    );

  return (
    <div className=" p-2 h-14 w-14 bg-yellow-200" key={index}>
      <div className="bg-white w-12 h-12 rounded-full border border-black" />
    </div>
  );
}

Token.propTypes = {
  blue: PropTypes.bool,
  red: PropTypes.bool,
};

Token.defaultProps = {
  blue: false,
  red: false,
};

export default Token;
