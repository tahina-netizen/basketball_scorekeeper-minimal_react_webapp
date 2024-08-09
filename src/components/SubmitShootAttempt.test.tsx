import { screen, render, getByRole, getAllByRole } from "@testing-library/react"
import SubmitShootAttempt from "./SubmitShootAttempt"
import userEvent from "@testing-library/user-event"

describe("SubmitShootAttempt default rendering", () => {
    it("should display a single button", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}/>)

        const shootButton = screen.getByRole("button", {name: /shoot/})

        expect(shootButton).toBeVisible()
    })
})

describe("SubmitShootAttempt (dynamic interaction)", () => {
    it("should display 2 additional buttons, one for validating increment action and one for invalidating it when clicked", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}></SubmitShootAttempt>)

        const shootButton = screen.getByRole("button", {name: /shoot/})

        userEvent.click(shootButton)

        const [_, validateButton, invalidateButton] = screen.getAllByRole("button")
        expect(validateButton).toHaveTextContent("Ok")
        expect(invalidateButton).toHaveTextContent("Missed")
    })

    it("should hide validate/invalidate buttons when validate button is clicked", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}></SubmitShootAttempt>)

        const shootButton = screen.getByRole("button", {name: /shoot/})
        userEvent.click(shootButton)
        const [_, validateButton, __] = screen.getAllByRole("button")
        expect(validateButton).toHaveTextContent("Ok")

        userEvent.click(validateButton)

        const buttonsLeft = screen.getAllByRole("button")
        expect(buttonsLeft).toHaveLength(1)
        expect(buttonsLeft[0]).toHaveTextContent("shoot")
    })

    it("should hide validate/invalidate buttons when invalidate button is clicked", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}></SubmitShootAttempt>)

        const shootButton = screen.getByRole("button", {name: /shoot/})
        userEvent.click(shootButton)
        const [_, __, invalidateButton] = screen.getAllByRole("button")
        expect(invalidateButton).toHaveTextContent("Missed")

        userEvent.click(invalidateButton)

        const buttonsLeft = screen.getAllByRole("button")
        expect(buttonsLeft).toHaveLength(1)
        expect(buttonsLeft[0]).toHaveTextContent("shoot")
    })

    it("should call submitAttempt() with an ok attempt when the validate button is clicked", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}></SubmitShootAttempt>)
        const shootButton = screen.getByRole("button", {name: /shoot/})
        userEvent.click(shootButton)
        const [_, validateButton, __] = screen.getAllByRole("button")
        expect(validateButton).toHaveTextContent("Ok")

        userEvent.click(validateButton)

        expect(mockIncrement).toHaveBeenCalledTimes(1)
        expect(mockIncrement).toHaveBeenCalledWith("ok")
    })

    it("should call submitAttempt() with a missed attempt when the validate button is clicked", () => {
        const mockIncrement = jest.fn()
        render(<SubmitShootAttempt label="shoot" submitAttempt={mockIncrement}></SubmitShootAttempt>)
        const shootButton = screen.getByRole("button", {name: /shoot/})
        userEvent.click(shootButton)
        const [_, __, invalidateButton] = screen.getAllByRole("button")
        expect(invalidateButton).toHaveTextContent("Missed")

        userEvent.click(invalidateButton)

        expect(mockIncrement).toHaveBeenCalledTimes(1)
        expect(mockIncrement).toHaveBeenCalledWith("missed")
    })
})