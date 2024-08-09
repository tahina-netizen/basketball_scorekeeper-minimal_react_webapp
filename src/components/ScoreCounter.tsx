import ShootAttempt from '../core/ShootAttempt';
import './ScoreCounter.css'
import SubmitShootAttempt from './SubmitShootAttempt';

export default function ScoreCounter({name, score, submitAttempt}: {name: string, score: number, submitAttempt: (x: ShootAttempt) => void}) {
  
  function submitAttemptWithPoint(point: number) {
    return function(result: "ok" | "missed") {
      submitAttempt({result: result, point: point})
    }
    
  }

  const inputId = `score-${name.toLowerCase()}`;
  return (
    <div className="score-counter" data-testid={`scorebox-${name.toLocaleLowerCase()}`}>
      <label htmlFor={inputId}>{name}</label>
      <input id={inputId} readOnly value={score}/>
      <SubmitShootAttempt label="+1" submitAttempt={submitAttemptWithPoint(1)}></SubmitShootAttempt>
      <SubmitShootAttempt label="+2" submitAttempt={submitAttemptWithPoint(2)}></SubmitShootAttempt>
      <SubmitShootAttempt label="+3" submitAttempt={submitAttemptWithPoint(3)}></SubmitShootAttempt>
    </div>
  )
}