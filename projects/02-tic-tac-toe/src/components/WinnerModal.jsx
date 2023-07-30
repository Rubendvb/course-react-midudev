import React from 'react'
import Square from './Square'

export default function WinnerModal({ winner, resetGame }) {
  if (winner === null) {
    return null
  }

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? 'Empate' : 'Gano:'}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Começar de novo</button>
        </footer>
      </div>
    </section>
  )
}
