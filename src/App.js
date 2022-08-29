import React from 'react';
import './App.css';
import Die from './Components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [won, setWon] = React.useState(false)
  const [score, setScore] = React.useState(0)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setWon(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const diceElement = dice.map(die =>
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } : die
    }))
  }
  function rollDice() {
    if (won) {
      setDice(allNewDice())
      setWon(false)
      setScore(0)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setScore(prevScore => prevScore + 1)
    }
  }

  return (
    <main className="App">
      {won && <Confetti />}
      <div className="container">
        <div>
          <h1 className="title">Tenzies</h1>
          <p>
            {won ? `WOW! You Rolled the Dice ${score} Times! ` : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
          </p>
          <p className='score'>{score === 0 ? 'Lets go...!' : `Score: ${score}`}</p>
        </div>

        <div className="box-container">
          {diceElement}
        </div>
        <button className="button" onClick={rollDice}>{won ? "Reset Game" : "Roll Dice"}</button>
      </div>
    </main >
  );
}

export default App;
