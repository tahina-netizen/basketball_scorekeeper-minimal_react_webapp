import ShootAttempt from "../core/ShootAttempt"
import "./TeamStats.css"

interface Props {
    teamLabel: string,
    teamAttempts: ShootAttempt[]
}

export default function TeamStats(props: Props) {
    const teamAttempts = props.teamAttempts
    const teamAttemptsIsEmpty = teamAttempts.length == 0
    const fieldGoal = teamAttemptsIsEmpty ? "N/A" : "TODO"
    const threePointFieldGoal = teamAttemptsIsEmpty ? "N/A" : "TODO"
    const freeThrowFieldGoal = teamAttemptsIsEmpty ? "N/A" : "TODO"
    return (
        <div className="team-stats-box" data-testid={`team-stats-box_${props.teamLabel.toLocaleLowerCase()}`}>
            <h2>{`${props.teamLabel} team stats`}</h2>
            <label className="team-stats-row">
                FG
                <input readOnly value={fieldGoal}></input>
            </label>
            <label className="team-stats-row">
                3-pt FG
                <input readOnly value={threePointFieldGoal}></input>
            </label>
            <label className="team-stats-row">
                FT FG
                <input readOnly value={freeThrowFieldGoal}></input>
            </label>
        </div>
    )
}