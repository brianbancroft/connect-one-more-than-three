import React from "react";
import PropTypes from "prop-types";

function ButtonTriggerMove(props) {
  const { onClick, currentColor, disabled } = props;

  if (disabled)
    return (
      <button
        className={`rounded p-4 border bg-gray-400 cursor-not-allowed`}
        disabled
        name="drop-token"
      />
    );

  return (
    <>
      <button
        className={`
          rounded p-4 border bg-${currentColor}-400 hover:bg-${currentColor}-500 
          active:bg-${currentColor}-700 border-b-4 border-${currentColor}-700 active:border-b-0 h-8
        `}
        onClick={onClick}
        aria-label="drop-token"
        name="drop-token"
      />

      <div className="h-0 w-0 hidden bg-red-400 hover:bg-red-500 active:bg-red-700  border-red-700 " />
      <div className="h-0 w-0 hidden bg-blue-400 hover:bg-blue-500 active:bg-blue-700  border-blue-700 " />
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
