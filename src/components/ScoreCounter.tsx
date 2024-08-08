import './ScoreCounter.css'

export default function ScoreCounter({name, score, incrementBy}: {name: string, score: number, incrementBy: (x: number) => void}) {
  
  const inputId = `score-${name.toLowerCase()}`;
  return (
    <div className="score-counter" data-testid={`scorebox-${name.toLocaleLowerCase()}`}>
      <label htmlFor={inputId}>{name}</label>
      <input id={inputId} readOnly value={score}/>
      <button onClick={() => incrementBy(1)}>+1</button>
      <button onClick={() => incrementBy(2)}>+2</button>
      <button onClick={() => incrementBy(3)}>+3</button>
    </div>
  )
}