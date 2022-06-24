import React from "react";
import PropTypes from "prop-types";

function IndicatorActivePlayer(props) {
  const { playerName, color, active } = props;

  return (
    <div>
      <h3
        className={`text-xl user-select-none ${
          active ? `underline text-${color}-600` : ""
        }`}
      >
        {playerName}
      </h3>
      {active ? <div className="">your turn</div> : <></>}
    </div>
  );
}

IndicatorActivePlayer.propTypes = {
  playerName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

IndicatorActivePlayer.defaultProps = {
  active: false,
};

export default IndicatorActivePlayer;
