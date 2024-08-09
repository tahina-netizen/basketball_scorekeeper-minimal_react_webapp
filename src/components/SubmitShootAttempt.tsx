import { useState } from "react"
import './SubmitShootAttempt.css'

export default function SubmitShootAttempt({label, submitAttempt} : {label: string, submitAttempt: (x: "ok" | "missed") => void}) {
    const [isActivated, setIsActivated] = useState(false)

    function onMainButtonClicked() {
        setIsActivated(true)
    }

    function onOkButtonClicked() {
        setIsActivated(false)
        submitAttempt("ok")
    }

    function onMissedButtonClicked() {
        setIsActivated(false)
        submitAttempt("missed")
    }

    const confirmationButtons = () =>
        <>
            <button className="button-validate" onClick={onOkButtonClicked}>Ok</button>
            <button className="button-invalidate" onClick={onMissedButtonClicked}>Missed</button>
        </>

    return (
        <div data-testid={`submit-shoot-attempt-wrapper_${label}`}>
            <button onClick={onMainButtonClicked}>{label}</button>
            <div data-testid="confirmation-buttons-box">
                {isActivated ? confirmationButtons() : null}
            </div>
        </div>
    )
}