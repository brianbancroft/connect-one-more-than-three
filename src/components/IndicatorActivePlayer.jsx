import React from 'react'
import PropTypes from 'prop-types'

function IndicatorActivePlayer(props) {
  const { playerName, color, active, playerColors } = props

  return (
    <>
      <div className={`hidden text-${playerColors[0]}-600`} />
      <div className={`hidden text-${playerColors[1]}-600`} />
      <div className="h-12">
        <h3
          className={`text-xl user-select-none ${
            active ? `underline text-${color}-600` : ''
          }`}
        >
          {playerName}
        </h3>
        {active ? <div className="">your turn</div> : <></>}
      </div>
    </>
  )
}

IndicatorActivePlayer.propTypes = {
  playerName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  active: PropTypes.bool,
  playerColors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

IndicatorActivePlayer.defaultProps = {
  active: false,
}

export default IndicatorActivePlayer
