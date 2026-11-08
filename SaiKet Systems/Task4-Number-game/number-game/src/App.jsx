
import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  )

  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('Start guessing!')
  const [won, setWon] = useState(false)

  const checkGuess = () => {
    let userGuess = Number(guess)

    if (guess === '' || userGuess < 1 || userGuess > 100 ||
        !Number.isInteger(userGuess)) {
      setMessage('Enter a number between 1 and 100')
      return
    }

    setAttempts(attempts + 1)

    if (userGuess === number) {
      setMessage('Congratulations! You guessed correctly!')
      setWon(true)
    } else if (userGuess > number) {
      setMessage('Too High! Try a smaller number.')
    } else {
      setMessage('Too Low! Try a bigger number.')
    }

    setGuess('')
  }

  const newGame = () => {
    setNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setAttempts(0)
    setMessage('Start guessing!')
    setWon(false)
  }

  return (
    <div className="container">
      <div className="game">

        <h1>Number Guessing Game</h1>
        <p>Guess a number between 1 and 100</p>

        <input
          type="number"
          placeholder="Enter your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={won}
        />

        <button onClick={checkGuess} disabled={won}>
          Check Guess
        </button>

        <div className="result">
          <h3>{message}</h3>
          <p>Number of Attempts: {attempts}</p>
        </div>

        {won && (
          <button className="newgame" onClick={newGame}>
            Play Again
          </button>
        )}

      </div>
    </div>
  )
}

export default App
