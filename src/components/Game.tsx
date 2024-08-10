import { useState } from "react";
import ScoreCounter from "./ScoreCounter";
import './Game.css'
import ShootAttempt from "../core/ShootAttempt";
import TeamStats from "./TeamStats";

export default function Game() {
  const [awayScore, setAwayScore] = useState(0)
  const [homeScore, setHomeScore] = useState(0)

  function submitAwayShootAttempt(attempt: ShootAttempt) {
    switch(attempt.result) {
      case "ok":
        setAwayScore(awayScore + attempt.point)
        break;
    }
  }

  function submitHomeShootAttempt(attempt: ShootAttempt) {
    switch(attempt.result) {
      case "ok":
        setHomeScore(homeScore + attempt.point)
        break;
    }
  }

  return (
    <>
      <div className="game">
        <div id="two-counters">
          <ScoreCounter name="Away" score={awayScore} submitAttempt={submitAwayShootAttempt}></ScoreCounter>
          <ScoreCounter name="Home" score={homeScore} submitAttempt={submitHomeShootAttempt}></ScoreCounter>
        </div>
        <div id="two-team-stats">
          <TeamStats teamLabel="Away" teamAttempts={[]}></TeamStats>
          <TeamStats teamLabel="Home" teamAttempts={[]}></TeamStats>
        </div>
      </div>
    </>
  )
}
    