import {getAllByRole, getByLabelText, getByTestId, getByText, render, screen } from '@testing-library/react'
import Game from "./Game";
import userEvent from '@testing-library/user-event';

describe("Game default rendering", () => {
  it("should show two counter (Away and Home) initialized to 0", () => {
    render(<Game />);

    const awayCounter = screen.getByLabelText(/Away/i)
    const homeCounter = screen.getByLabelText(/Home/i)

    expect(awayCounter).toHaveValue("0")
    expect(homeCounter).toHaveValue("0")
  })

  it("should show three buttons (+1, +2 and +3) under each counter", () => {
    render(<Game />);

    const awayButtons = getAllByRole(getAwayScoreBox(), "button")
    const homeButtons = getAllByRole(getHomeScoreBox(), "button")

    const expectedButtonLabels = ["+1", "+2", "+3"]
    expect(awayButtons.length).toBe(3)
    awayButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(expectedButtonLabels[index])
    })

    expect(homeButtons.length).toBe(3)
    homeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(expectedButtonLabels[index])
    })    
  })

  it("should show a box of away team with title and initialized stats", () => {
    render(<Game/>)

    const awayStatBox = screen.getByTestId("team-stats-box_away")
    const title = getByText(awayStatBox, /Away team stats/)
    const fieldGoal = getByLabelText(awayStatBox, "FG")
    const threePointFieldGoal = getByLabelText(awayStatBox, "3-pt FG")
    const freeThrowFieldGoal = getByLabelText(awayStatBox, "FT FG")

    expect(title).toBeVisible()
    expect(fieldGoal).toHaveValue("N/A")
    expect(threePointFieldGoal).toHaveValue("N/A")
    expect(freeThrowFieldGoal).toHaveValue("N/A")
  })

  it("should show a box of home team with title and initialized stats", () => {
    render(<Game/>)

    const homeStateBox = screen.getByTestId("team-stats-box_home")
    const title = getByText(homeStateBox, /Home team stats/)
    const fieldGoal = getByLabelText(homeStateBox, "FG")
    const threePointFieldGoal = getByLabelText(homeStateBox, "3-pt FG")
    const freeThrowFieldGoal = getByLabelText(homeStateBox, "FT FG")

    expect(title).toBeVisible()
    expect(fieldGoal).toHaveValue("N/A")
    expect(threePointFieldGoal).toHaveValue("N/A")
    expect(freeThrowFieldGoal).toHaveValue("N/A")
  })
})

describe("Game (with interaction)", () => {
  it("should increment the score when +1, +2 or +3 button is clicked for 'home' counter", () => {
    render(<Game />)

    const homeCounter = screen.getByLabelText(/Home/i)
    const [plus1Button, plus2Button, plus3Button] = getAllByRole(getHomeScoreBox(), "button")

    userEvent.click(plus1Button)
    const [okButton1, _] = getConfirmationButtons("home", "+1")
    userEvent.click(okButton1)
    expect(homeCounter).toHaveValue("1")

    userEvent.click(plus2Button)
    const [okButton2, __] = getConfirmationButtons("home", "+2")
    userEvent.click(okButton2)
    expect(homeCounter).toHaveValue("3")

    
    userEvent.click(plus3Button)
    const [okButton3, ___] = getConfirmationButtons("home", "+3")
    userEvent.click(okButton3)
    expect(homeCounter).toHaveValue("6")
  })

  it("should increment the score when +1, +2 or +3 button is clicked for 'away' counter", () => {
    render(<Game />)

    const awayCounter = screen.getByLabelText(/Away/i)
    const [plus1Button, plus2Button, plus3Button] = getAllByRole(getAwayScoreBox(), "button")
    
    userEvent.click(plus1Button)
    const [okButton1, _] = getConfirmationButtons("away", "+1")
    userEvent.click(okButton1)
    expect(awayCounter).toHaveValue("1")

    userEvent.click(plus2Button)
    const [okButton2, __] = getConfirmationButtons("away", "+2")
    userEvent.click(okButton2)
    expect(awayCounter).toHaveValue("3")

    
    userEvent.click(plus3Button)
    const [okButton3, ___] = getConfirmationButtons("away", "+3")
    userEvent.click(okButton3)
    expect(awayCounter).toHaveValue("6")
  }) 
})

function getAwayScoreBox() {
  return screen.getByTestId("scorebox-away")
}

function getHomeScoreBox() {
  return screen.getByTestId("scorebox-home")
}

function getConfirmationButtons(awayOrHome: "away" | "home", mainButtonLabel: string) {
  const counterBox = screen.getByTestId(`scorebox-${awayOrHome}`)
  const wrapper = getByTestId(counterBox, `submit-shoot-attempt-wrapper_${mainButtonLabel}`)
  const [_, validateButton, invalidateButton] = getAllByRole(wrapper, "button")
  expect(validateButton).toHaveTextContent("Ok")
  expect(invalidateButton).toHaveTextContent("Missed")
  return [validateButton, invalidateButton]
}
