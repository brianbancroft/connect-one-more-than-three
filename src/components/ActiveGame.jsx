import React, { useReducer } from 'react'

import Board from './Board'
import ButtonTriggerMove from './ButtonTriggerMove'
import IndicatorActivePlayer from './IndicatorActivePlayer'
import useDetectVictory from '../hooks/useDetectVictory'

const blankRow = () => [null, null, null, null, null, null, null]
const generateBoard = () => Array.from(Array(6)).map(blankRow)

const initialState = {
  boardStatus: generateBoard(),
  playerOneActive: true,
  lastPiecePlayed: {
    row: null,
    column: null,
    currentUser: null,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'update-board':
      return {
        boardStatus: action.boardStatus,
        playerOneActive: !state.playerOneActive,
        lastPiecePlayed: action.lastPiecePlayed,
      }

    case 'reset':
      return {
        boardStatus: generateBoard(),
        playerOneActive: true,
        lastPiecePlayed: {
          row: null,
          column: null,
          currentUser: null,
        },
      }

    default:
      throw new Error(
        `Unknown reducer case triggered in ActiveGame.jsx: "${action.type}"`,
      )
  }
}

function ActiveGame() {
  const playerColors = ['blue', 'red']
  const [state, dispatch] = useReducer(reducer, initialState)

  const currentUser = state.playerOneActive ? playerColors[0] : playerColors[1]

  const { boardStatus, lastPiecePlayed } = state

  const { victory, stalemate } = useDetectVictory({
    boardStatus,
    lastPiecePlayed,
  })

  const executeTurn = ({ boardStatus, lastPiecePlayed }) =>
    dispatch({ boardStatus, lastPiecePlayed, type: 'update-board' })

  const handleColumnClick = (columnIndex) => () => {
    const newBoard = [...boardStatus]
    const reversedRows = newBoard.reverse()

    for (let i = 0; i < reversedRows.length; i++) {
      const row = reversedRows[i]

      if (!(row[columnIndex] === 'red' || row[columnIndex] === 'blue')) {
        reversedRows[i][columnIndex] = currentUser

        executeTurn({
          boardStatus: reversedRows.reverse(),
          lastPiecePlayed: {
            row: 6 - 1 - i,
            column: columnIndex,
            currentUser,
          },
        })

        break
      }
    }
  }

  const determineColumnUnavailable = (columnIndex) => {
    for (let i = 0; i < boardStatus.length; i++) {
      const row = boardStatus[i]
      if (row[columnIndex] === null) return false
    }
    return true
  }

  function handleEndGame() {
    dispatch({ type: 'reset' })
  }

  const gameOver = victory || stalemate

  return (
    <div className="my-4">
      <div className="grid grid-cols-7 px-2 gap-x-4 border-black border-t border-x py-2">
        {Array.from(Array(7)).map((_, index) => (
          <ButtonTriggerMove
            key={`trigger-move-${index}`}
            onClick={handleColumnClick(index)}
            disabled={Boolean(gameOver || determineColumnUnavailable(index))}
            currentColor={currentUser}
          />
        ))}
      </div>

      <Board boardStatus={boardStatus} />
      <br />

      <section className="">
        <div className="flex justify-between w-full">
          <IndicatorActivePlayer
            playerName="Player 1"
            color={playerColors[0]}
            active={!gameOver && playerColors[0] === currentUser}
            playerColors={playerColors}
          />

          <IndicatorActivePlayer
            playerName="Player 2"
            color={playerColors[1]}
            active={!gameOver && playerColors[1] === currentUser}
            playerColors={playerColors}
          />
        </div>
        <div className="capitalize flex w-full items-center pt-2 flex-col">
          {stalemate && !victory ? (
            <h2 className="text-2xl font-bold underline capitalize">
              stalemate
            </h2>
          ) : (
            <></>
          )}
          {victory ? (
            victory === 'blue' ? (
              <h2 className="text-blue-600 underline text-2xl my-4 font-bold capitalize">
                player 1 wins!
              </h2>
            ) : (
              <h2 className="text-red-600 underline text-2xl my-4 font-bold capitalize">
                player 2 wins
              </h2>
            )
          ) : (
            <></>
          )}
          {(stalemate || victory) && (
            <button
              onClick={handleEndGame}
              className="bg-slate-200 border-b-4 text-slate-600 italic p-4 border border-slate-300 rounded"
            >
              Start Over
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default ActiveGame
