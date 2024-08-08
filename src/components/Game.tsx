import { useState } from "react";
import ScoreCounter from "./ScoreCounter";
import './Game.css'

export default function Game() {
  const [awayScore, setAwayScore] = useState(0)
  const [homeScore, setHomeScore] = useState(0)

  function incrementAwayScoreBy(incr: number) {
    setAwayScore(awayScore + incr)
  }

  function incrementHomeScoreBy(incr: number) {
    setHomeScore(homeScore + incr)
  }

  return (
    <>
      <div className="game">
        <ScoreCounter name="Away" score={awayScore} incrementBy={incrementAwayScoreBy}></ScoreCounter>
        <ScoreCounter name="Home" score={homeScore} incrementBy={incrementHomeScoreBy}></ScoreCounter>
      </div>
    </>
  )
}
    