import {getAllByRole, render, screen } from '@testing-library/react'
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

    const awayCounter = screen.getByLabelText(/Away/i)
    const homeCounter = screen.getByLabelText(/Home/i)

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
})

describe("Game (with interaction)", () => {
  it("should increment the score when +1, +2 or +3 button is clicked for 'home' counter", () => {
    render(<Game />)

    const homeCounter = screen.getByLabelText(/Home/i)
    const [plus1Button, plus2Button, plus3Button] = getAllByRole(getHomeScoreBox(), "button")

    userEvent.click(plus1Button)
    expect(homeCounter).toHaveValue("1")

    userEvent.click(plus2Button)
    expect(homeCounter).toHaveValue("3")

    userEvent.click(plus3Button)
    expect(homeCounter).toHaveValue("6")
  })

  it("should increment the score when +1, +2 or +3 button is clicked for 'away' counter", () => {
    render(<Game />)

    const awayCounter = screen.getByLabelText(/Away/i)
    const [plus1Button, plus2Button, plus3Button] = getAllByRole(getAwayScoreBox(), "button")
    
    userEvent.click(plus1Button) 
    expect(awayCounter).toHaveValue("1")

    userEvent.click(plus2Button)
    expect(awayCounter).toHaveValue("3")

    userEvent.click(plus3Button)
    expect(awayCounter).toHaveValue("6")
  }) 
})

function getAwayScoreBox() {
  return screen.getByTestId("scorebox-away")
}

function getHomeScoreBox() {
  return screen.getByTestId("scorebox-home")
}
