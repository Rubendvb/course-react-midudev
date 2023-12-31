import { useState } from 'react'
import confetti from 'canvas-confetti'

import Square from './components/Square'
import WinnerModal from './components/WinnerModal'

import { TURNS } from './assets/js/constants'
import { checkWinnerFrom, checkEndGame } from './assets/js/board'
import { saveGameToStorage, resetGameToStorage } from './assets/js/storage'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')

    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameToStorage()
  }

  const updateBoard = (index) => {
    // Não atualiza se já tem dado
    if (board[index] || winner) {
      return
    }

    // atualizar a tabela
    const newBoard = [...board]
    newBoard[index] = turn

    setBoard(newBoard)

    // mudar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X

    setTurn(newTurn)

    // guardar partida no localStorage
    saveGameToStorage({ board: newBoard, turn: newTurn })

    // revisar se tem ganhador
    const newWinner = checkWinnerFrom(newBoard)

    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset jogo</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
