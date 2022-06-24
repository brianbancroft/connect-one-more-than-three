import React from "react";
import PropTypes from "prop-types";

function ButtonTriggerMove(props) {
  const { onClick, currentColor, disabled } = props;

  if (disabled)
    return (
      <button
        className={`rounded p-4 border bg-gray-400 cursor-not-allowed`}
        disabled
      >
        ␣
      </button>
    );

  return (
    <>
      <button
        className={`rounded p-4 border bg-${currentColor}-400 hover:bg-${currentColor}-700`}
        onClick={onClick}
      >
        ␣
      </button>
      <div className="h-0 w-0 hidden bg-red-400 hover:bg-red-700" />
      <div className="h-0 w-0 hidden bg-blue-400 hover:bg-blue-700" />
      <div className="h-0 w-0 hidden bg-blue-700" />
      <div className="h-0 w-0 hidden bg-red-700" />
    </>
  );
}

ButtonTriggerMove.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ButtonTriggerMove;
