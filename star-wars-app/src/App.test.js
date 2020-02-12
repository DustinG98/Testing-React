import axios from 'axios'
import React from 'react'

import * as rtl from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import App from './App'

jest.mock("axios", () => {
    return {
        get: jest.fn(() => Promise.resolve({
            data: {
                results: [{name: "Luke", url: "https://swapi.co/api/people/1/"}, {name: "C-3PO", url: "https://swapi.co/api/people/2/"}]
            }
        }))
    }
})

afterEach(rtl.cleanup)

test("Made API Call", async () => {
    const wrapper = rtl.render(<App/>)

    await wrapper.findAllByTestId("character")

    expect(axios.get).toHaveBeenCalled()
})